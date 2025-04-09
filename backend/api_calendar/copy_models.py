from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractUser

SUPERVISION = [
    ('CLIENT', 'Client'),
    ('STAFF', 'Staff'),
    ('ADMIN', 'Admin')
]



class User(AbstractUser):
    user_role = models.CharField(max_length=100, choices=SUPERVISION, default='CLIENT')
    city = models.CharField(max_length=100)
    # id_number = models.CharField(max_length=100, unique=True, null='')  # Provide a default value


class Staff(User):
    specializations = models.CharField(max_length=100)


class Client(User):
    assigned_staff = models.ForeignKey(Staff, on_delete=models.SET_NULL, null=True, blank=False)


class Admin(User):
    department = models.CharField(max_length=100)


class Appointment(models.Model):
    time = models.DateTimeField(auto_now_add=True)
    time1 = models.DateTimeField(default=timezone.now)
    client_appointment = models.ForeignKey(Client, on_delete=models.SET_NULL, null=True, blank=True)

