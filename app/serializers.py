from urllib import request
from zoneinfo import ZoneInfo

from rest_framework import serializers
from .models import Users, Flight, airline
from .models import Users

from rest_framework import serializers
from .models import Users
from django.contrib.auth.hashers import make_password

from rest_framework import serializers
from .models import Users
import random


from rest_framework import serializers
from .models import Users
import random

import pytz


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


        return user
    
    
class FlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flight
        fields = '__all__'