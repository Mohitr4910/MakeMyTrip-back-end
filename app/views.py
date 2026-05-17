from urllib import request

from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Booking, Payment, Users, Flight, airline
from .serializers import BookingSerializer, CompanySerializer, UserSerializer, FlightSerializer
from .permissions import BookingPermission, FlightPermission
from django.utils import timezone



import razorpay
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response


# USER VIEWSET

class UserViewSet(viewsets.ModelViewSet):

    queryset = Users.objects.all()
    serializer_class = UserSerializer


class CompanyViewSet(viewsets.ModelViewSet):

    queryset = airline.objects.all()
    serializer_class = CompanySerializer


# FLIGHT VIEWSET

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


# LOGIN VIEW

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils import timezone

from .models import Users


@api_view(['POST'])
def login_view(request):

    email = request.data.get('email')
    password = request.data.get('password')
  
    try:

        user = Users.objects.get(email=email)

        if user.check_password(password):

            refresh = RefreshToken.for_user(user)

            user.last_login = timezone.now()
            user.save()

            return Response({

                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'role': user.role,
                'user': UserSerializer(user).data

            }, status=status.HTTP_200_OK)

        else:

            return Response({
                'message': 'Wrong Password'
            }, status=status.HTTP_401_UNAUTHORIZED) 
          

    except Users.DoesNotExist:

        return Response({
            'message': 'User not found'
        }, status=status.HTTP_404_NOT_FOUND)
    

class BookingViewSet(viewsets.ModelViewSet):

    serializer_class = BookingSerializer

    queryset = Booking.objects.all()

    permission_classes = [BookingPermission]

    
    def get_queryset(self):

        return Booking.objects.filter(
            user=self.request.user
        ).order_by("-id")

    def perform_create(self, serializer):

        serializer.save(
            user=self.request.user
        )

    def get_queryset(self):

        user = self.request.user

        # admin/company sab dekh sakta
        if user.role in ["admin", "company"]:
            return Booking.objects.all().order_by("-id")

        # normal user sirf apni
        return Booking.objects.filter(
            user=user
        ).order_by("-id")
    


client = razorpay.Client(
    auth=("rzp_test_SC9152Au7RX5Z7", "IuIp6xLygtLefBKSfVJbh2gg")
)

@api_view(["POST"])
def create_order(request):

    total_price=int(request.data.get("amount"))
    amount = int(request.data.get("amount")) * 100
    email= request.data.get("email")
    contact = request.data.get("contact")
    print(amount, email, contact)


    payment = client.order.create({
        "amount": amount,
        "currency": "INR",
        "payment_capture": "1"
    })


    Payment.objects.create(
        amount=str(total_price),
        user_email=email,
        contact=contact,
        order_id=payment["id"]
    )
    print(payment)

    return Response(payment)


    
@api_view(["POST"])
def payment_status(request):

    response = request.data

    razorpay_data = {"razorpay_order_id": response.get("razorpay_order_id"),
                     "razorpay_payment_id":response.get("razorpay_payment_id"),
                       "razorpay_signature":response.get("razorpay_signature"),
    }

    print(razorpay_data)

    try:

        # -----------------------------------
        # VERIFY PAYMENT
        # -----------------------------------
        client.utility.verify_payment_signature(
            razorpay_data
        )

        # -----------------------------------
        # UPDATE PAYMENT
        # -----------------------------------
        payment = Payment.objects.get(
            order_id=response.get(
                "razorpay_order_id"
            )
        )

        payment.razorpay_payment_id = response.get(
            "razorpay_payment_id"
        )

        payment.paid = True

        payment.save()

        return Response(
            {
                "status": True,
                "message": "Payment Success"
            },
            status=status.HTTP_200_OK
        )

    except Exception as e:

        print(e)

        return Response(
            {
                "status": False,
                "message": "Payment Failed"
            },
            status=status.HTTP_400_BAD_REQUEST
        )