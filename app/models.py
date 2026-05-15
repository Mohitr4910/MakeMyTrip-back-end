from statistics import mode

from django.db import models
from django.contrib.auth.models import AbstractUser

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


