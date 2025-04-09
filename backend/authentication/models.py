from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.contrib.auth.hashers import make_password
from phonenumber_field.modelfields import PhoneNumberField
from django.forms import ValidationError


class Company(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100, blank=True, null=True)
    contact_person = models.CharField(max_length=100, blank=True, null=True)


class CustomUserManager(BaseUserManager):

    def create_superuser(self, username, email, password=None):
        superuser = self.model.objects.create(
            username=username,
            email=email,
            password=make_password(password),
            is_staff=True,
            is_superuser=True,
            user_role="ADMIN",
        )
        Admin.objects.create(user=superuser)
        return superuser


class CustomUser(AbstractUser):
    SUPERVISION_CHOICES = [
        ("CLIENT", "Patient"),
        ("STAFF", "Doctor"),
        ("ADMIN", "Secretary"),
    ]

    GENDER_CHOICE = [
        ("M", "Male"),
        ("F", "Female"),
    ]

    company = models.ForeignKey(
        Company, on_delete=models.CASCADE, null=True, blank=True
    )
    user_role = models.CharField(
        max_length=100, choices=SUPERVISION_CHOICES, default="CLIENT"
    )
    # city = models.CharField(max_length=100, blank=True, null=True)
    specializations = models.CharField(max_length=100, blank=True, null=True)
    department = models.CharField(max_length=100, blank=True, null=True)
    # added 21_2_2024
    city = models.CharField(max_length=100, blank=True, null=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.CharField(max_length=256)
    date_birth = models.DateField(blank=True, null=True)
    address = models.CharField(max_length=100, blank=True, null=True)
    postcode = models.CharField(max_length=100, blank=True, null=True)
    gender = models.CharField(max_length=1, blank=True, choices=GENDER_CHOICE)
    phone_number = PhoneNumberField(null=True, blank=True)
    gesy_number = models.CharField(max_length=100, null=True, blank=True)
    id_card = models.CharField(max_length=50, null=True, blank=True, unique=True)
    color = models.CharField(max_length=20, null=True, blank=True)
    objects = CustomUserManager()

    def save(self, *args, **kwargs):
        # if self.pk is None:
        #     if self.company is None and not self.is_superuser:
        #         raise ValidationError({'company': ["Required Field"]})
        super().save(*args, **kwargs)


class Staff(models.Model):
    user = models.OneToOneField(
        CustomUser, on_delete=models.CASCADE, null=True, blank=True
    )


class Client(models.Model):
    user = models.OneToOneField(
        CustomUser, on_delete=models.CASCADE, null=True, blank=True
    )
    assigned_staff = models.ForeignKey(
        Staff, on_delete=models.SET_NULL, null=True, blank=True
    )


class Admin(models.Model):
    user = models.OneToOneField(
        CustomUser, on_delete=models.CASCADE, null=True, blank=True
    )


class ClientComment(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    comment_text = models.TextField()
    visibility = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
