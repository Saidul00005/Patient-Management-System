from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.contrib.auth.hashers import make_password
from phonenumber_field.modelfields import PhoneNumberField
from django.forms import ValidationError
from encrypted_model_fields.fields import EncryptedCharField,EncryptedTextField,EncryptedDateField


class Company(models.Model):
    name = models.CharField(max_length=100)
    address =EncryptedCharField(max_length=100, blank=True, null=True)
    contact_person = EncryptedCharField(max_length=100, blank=True, null=True)


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
    user_role =models.CharField(
        max_length=100, choices=SUPERVISION_CHOICES
    )
 
    # Common fields for all users
    first_name =EncryptedCharField(max_length=100)
    last_name = EncryptedCharField(max_length=100)
    email = EncryptedCharField(max_length=256)
    phone_number = PhoneNumberField(null=True, blank=True)
    gender =  EncryptedCharField(max_length=1, blank=True, choices=GENDER_CHOICE,null=True)
    date_birth = EncryptedDateField(blank=True, null=True)


    # Fields only for STAFF (Doctors) and ADMIN (Secretaries)
    city = EncryptedCharField(max_length=100, blank=True, null=True)
    specializations = EncryptedCharField(max_length=100, blank=True, null=True)
    department = EncryptedCharField(max_length=100, blank=True, null=True)
    address = EncryptedCharField(max_length=100, blank=True, null=True)
    postcode = EncryptedCharField(max_length=100, blank=True, null=True)
    gesy_number =EncryptedCharField(max_length=100, null=True, blank=True)
    id_card = EncryptedCharField(max_length=50, null=True, blank=True, unique=True)
    color = EncryptedCharField(max_length=20, null=True, blank=True)
    objects = CustomUserManager()

    def save(self, *args, **kwargs):
        # if self.pk is None:
        #     if self.company is None and not self.is_superuser:
        #         raise ValidationError({'company': ["Required Field"]})

        if self.user_role == "CLIENT":  # Patient
            self.specializations = None
            self.department = None
            self.address = None
            self.postcode = None
            self.city = None
            self.id_card = None
            self.gesy_number = None
            self.color = None
            
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
    comment_text =EncryptedTextField()
    visibility = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
