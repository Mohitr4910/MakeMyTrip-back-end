from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.utils import timezone

from rest_framework_simplejwt.tokens import RefreshToken

from .models import Booking, Payment, Users, Flight, airline
from .serializers import (
    BookingSerializer,
    CompanySerializer,
    UserSerializer,
    FlightSerializer
)
from .permissions import BookingPermission, FlightPermission

import razorpay


# =========================
# RAZORPAY CLIENT
# =========================
client = razorpay.Client(
    auth=("rzp_test_SC9152Au7RX5Z7", "IuIp6xLygtLefBKSfVJbh2gg")
)


# =========================
# USER VIEWSET
# =========================
class UserViewSet(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# =========================
# AIRLINE VIEWSET
# =========================
class CompanyViewSet(viewsets.ModelViewSet):
    queryset = airline.objects.all()
    serializer_class = CompanySerializer


# =========================
# FLIGHT VIEWSET
# =========================
class FlightViewSet(viewsets.ModelViewSet):
    permission_classes = [FlightPermission]
    queryset = Flight.objects.all()
    serializer_class = FlightSerializer

    def get_queryset(self):
        queryset = Flight.objects.all()

        from_city = self.request.GET.get("from")
        to_city = self.request.GET.get("to")

        if from_city:
            queryset = queryset.filter(from_location__icontains=from_city)

        if to_city:
            queryset = queryset.filter(destination__icontains=to_city)

        return queryset


# =========================
# LOGIN VIEW
# =========================
@api_view(["POST"])
def login_view(request):
    email = request.data.get("email")
    password = request.data.get("password")

    try:
        user = Users.objects.get(email=email)

        if user.check_password(password):
            refresh = RefreshToken.for_user(user)

            user.last_login = timezone.now()
            user.save()

            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "role": user.role,
                "user": UserSerializer(user).data
            }, status=status.HTTP_200_OK)

        return Response(
            {"message": "Wrong Password"},
            status=status.HTTP_401_UNAUTHORIZED
        )

    except Users.DoesNotExist:
        return Response(
            {"message": "User not found"},
            status=status.HTTP_404_NOT_FOUND
        )


# =========================
# BOOKING VIEWSET
# =========================
class BookingViewSet(viewsets.ModelViewSet):
    serializer_class = BookingSerializer
    permission_classes = [BookingPermission]

    def get_queryset(self):
        user = self.request.user

        if user.role in ["admin", "company"]:
            return Booking.objects.all().order_by("-id")

        return Booking.objects.filter(user=user).order_by("-id")

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# =========================
# CREATE ORDER (RAZORPAY)
# =========================
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_order(request):

    total_price = request.data.get("amount")
    email = request.data.get("email")
    contact = request.data.get("contact")

    # =========================
    # VALIDATION (IMPORTANT)
    # =========================
    if not total_price or not email or not contact:
        return Response(
            {"error": "amount, email, contact required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        amount = int(total_price) * 100

        # CREATE RAZORPAY ORDER
        payment = client.order.create({
            "amount": amount,
            "currency": "INR",
            "payment_capture": "1"
        })

        # SAVE PAYMENT IN DB (SAFE)
        Payment.objects.create(
            amount=str(total_price),
            user_email=email,
            contact=contact,
            order_id=payment["id"],
            paid=False
        )

        return Response(payment, status=status.HTTP_200_OK)

    except Exception as e:
        print("CREATE ORDER ERROR:", str(e))
        return Response(
            {"error": "Order creation failed"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


# =========================
# PAYMENT VERIFICATION
# =========================
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def payment_status(request):

    data = request.data

    razorpay_data = {
        "razorpay_order_id": data.get("razorpay_order_id"),
        "razorpay_payment_id": data.get("razorpay_payment_id"),
        "razorpay_signature": data.get("razorpay_signature"),
    }

    try:
        # VERIFY PAYMENT
        client.utility.verify_payment_signature(razorpay_data)

        # UPDATE PAYMENT
        payment = Payment.objects.get(
            order_id=razorpay_data["razorpay_order_id"]
        )

        payment.razorpay_payment_id = razorpay_data["razorpay_payment_id"]
        payment.paid = True
        payment.save()

        return Response({
            "status": True,
            "message": "Payment Success"
        }, status=status.HTTP_200_OK)

    except Exception as e:
        print("PAYMENT VERIFY ERROR:", str(e))

        return Response({
            "status": False,
            "message": "Payment Failed"
        }, status=status.HTTP_400_BAD_REQUEST)