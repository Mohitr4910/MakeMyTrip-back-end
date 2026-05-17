from statistics import mode

from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
# Create your models here.

class Users(AbstractUser):
    name= models.CharField(max_length=50)
    email=models.EmailField(max_length=100 ,unique=True)
    contact=models.CharField(max_length=10)
    password=models.CharField(max_length=50)
    
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('company', 'Company'),
        ('user', 'User'), )

    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='user')
    def __str__(self):
        return self.username


class airline(models.Model):
    
    useremail = models.OneToOneField(
        Users,
        to_field='email', 
        on_delete=models.CASCADE
    )
    
    company_code = models.CharField(max_length=100, unique=True)
    country = models.CharField(max_length=100)
    address = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    

    def __str__(self):
        return self.company_name


class Flight(models.Model):
    company_email= models.EmailField(max_length=50)
    name=models.CharField(max_length=50)
    source=models.CharField(max_length=50)
    from_location=models.CharField(max_length=50)
    destination=models.CharField(max_length=50)
    date=models.DateField()
    departuretime=models.TimeField()
    arrivaltime=models.TimeField()
    price=models.FloatField()


class Booking(models.Model):

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    flight = models.ForeignKey("app.Flight", on_delete=models.CASCADE)

    mobile_number = models.CharField(max_length=15)

    total_people = models.IntegerField()

    total_price = models.IntegerField(default=0)

    booking_date = models.DateTimeField(auto_now_add=True)
    
    
    def __str__(self):
        return f"Booking {self.id}"
    
class Passenger(models.Model):

    booking = models.ForeignKey(
        Booking,
        on_delete=models.CASCADE,
        related_name="passengers"
    )

    name = models.CharField(max_length=100)

    age = models.IntegerField()

    gender = models.CharField(max_length=10)

    seat_type = models.CharField(max_length=20)

    seat_price = models.IntegerField()

    def __str__(self):
        return self.name
    


class Payment(models.Model):
    amount = models.CharField(max_length=100 , blank=True)
    user_email = models.EmailField(max_length=100 )
    contact = models.CharField(max_length=10)
    order_id = models.CharField(max_length=1000 )
    razorpay_payment_id = models.CharField(max_length=1000 ,blank=True)
    paid = models.BooleanField(default=False)