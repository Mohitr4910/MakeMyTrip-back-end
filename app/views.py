from urllib import request

from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Users, Flight, airline
from .serializers import CompanySerializer, UserSerializer, FlightSerializer
from .permissions import FlightPermission
from django.utils import timezone


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