from urllib import request
from zoneinfo import ZoneInfo

from rest_framework import serializers
from .models import Users, Flight, airline
from django.contrib.auth.hashers import make_password

import random
import pytz

from .models import Booking, Passenger


from django.core.mail import send_mail



class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = airline
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):

    airline = CompanySerializer(read_only=True)

    last_login_ist = serializers.SerializerMethodField()

    class Meta:
        model = Users
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True},
            'username': {
                'required': False,
                'validators': [] 
            }
            }
    def get_last_login_ist(self, obj):

            if not obj.last_login:
                return None

            india_time = obj.last_login.astimezone(
                ZoneInfo("Asia/Kolkata")
            )

            return india_time.strftime("%d-%m-%Y %I:%M %p")
        

    def create(self, validated_data):
        password = validated_data.pop('password')
        email = validated_data.get('email')

        # username frontend se ya email se
        username = validated_data.get('username')

        if not username:
            username = email.split('@')[0]

        # same username ho to random number lagao
        original_username = username

        while Users.objects.filter(username=username).exists():
            username = f"{original_username}{random.randint(1000,9999)}"
        user = Users.objects.create(
            username=username,
            email=email,
            name=validated_data.get('name', ''),
            contact=validated_data.get('contact', ''),
            role=validated_data.get('role', 'user'), 
        )
        user.set_password(password)
        user.save()

        if user.role == "company":
            name=validated_data.get('name')
            message = f"""
            Hello {name},

            Your account has been created successfully.

            You can now login using the following credentials:

            Email ID : {email}
            Your Login Code : {password}

            Please keep your login details secure.

            Thank you for choosing our service.
            Have a great journey ahead!

            Regards,
            Flight Booking Team
            """
            send_mail(
                    "Welcome to Flight Booking Portal",message,
                                                    'mohitrahangdale67890@gmail.com',[email] ) 



        return user
    
    
class FlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flight
        fields = '__all__'


class PassengerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Passenger

        exclude = ["booking"]

from django.utils import timezone
from rest_framework import serializers

class BookingSerializer(serializers.ModelSerializer):

    passengers = PassengerSerializer(many=True)

    user = UserSerializer(read_only=True)

    flight_details = FlightSerializer(
        source="flight",
        read_only=True
    )

    booking_date_ist = serializers.SerializerMethodField()

    class Meta:

        model = Booking

        fields = "__all__"

        read_only_fields = ["user"]
            
    def get_booking_date_ist(self, obj):
        ist = pytz.timezone('Asia/Kolkata')
        ist_time = timezone.localtime(obj.booking_date, ist)
        return ist_time.strftime("%d-%m-%Y %I:%M %p")

    def create(self, validated_data):

        passengers_data = validated_data.pop("passengers")

        booking = Booking.objects.create(
            **validated_data
        )
        total = 0

        for passenger in passengers_data:

            total += passenger["seat_price"]

            Passenger.objects.create(
                booking=booking,
                **passenger
            )

        booking.total_price = total

        booking.save()

        user_email=booking.user.email
        user_name=booking.user.name
        serializer_data = BookingSerializer(booking).data
        message = f"""
                    Hello {user_name},
                    Your flight booking has been confirmed
                    successfully.

                    Booking Date : {serializer_data['booking_date_ist']}
                    Booking ID : {booking.id}
                    Total Price : ₹{booking.total_price}


                    Thank you for choosing us.
                    """

        send_mail(
                 "Flight Booking Confirmed",message,
                                                'mohitrahangdale67890@gmail.com',[user_email] ) 


        return booking