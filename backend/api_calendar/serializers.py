from authentication.models import Admin, CustomUser
from rest_framework import serializers
from .models import (
    Client,
    Staff,
    Appointment,
    Company,
    AppointmentComment,
    Note,
    Task,
    TaskComment,
)
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.serializers import (
    TokenObtainPairSerializer,
    TokenRefreshSerializer,
)
from rest_framework_simplejwt.tokens import RefreshToken
from jwt import decode as jwt_decode
from django.conf import settings
from rest_framework.validators import UniqueValidator
from django.contrib.auth import authenticate
import datetime
from django.db.models import Q
from datetime import datetime
from .exceptions import ConflictError
from rest_framework.exceptions import PermissionDenied


# # added for function to added client to staff
# import logging
# from rest_framework.exceptions import PermissionDenied, ValidationError
# logger = logging.getLogger(__name__)


class CompanySerializer(serializers.Serializer):
    name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Company
        fields = [
            "id",
            "name",
        ]

    def get__id(self, obj):
        return obj.id


class TokenRefreshLifetimeSerializer(TokenRefreshSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = RefreshToken(attrs["refresh"])
        access = refresh.access_token
        decoded_jwt = jwt_decode(
            str(access), verify=False, key=settings.SECRET_KEY, algorithms=["HS256"]
        )
        data["token_life"] = decoded_jwt["exp"]
        return data


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    # default_error_messages = {
    #     'no_active_account': _('Wrong credentials')
    # }
    @staticmethod
    def decode_token(token):
        decoded_token = jwt_decode(
            token, verify=False, key=settings.SECRET_KEY, algorithms=["HS256"]
        )
        return decoded_token

    def validate(self, attrs):
        data = super().validate(attrs)
        access_token = data.get("access")
        if access_token:
            decoded_access_token = self.decode_token(access_token)
            data["token_life"] = decoded_access_token["exp"]
        return data

    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)

        # Add custom claims
        return token


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True)
    refresh = serializers.CharField(read_only=True)
    access = serializers.CharField(read_only=True)

    def validate(self, data):
        username = data.get("username")
        password = data.get("password")
        user = authenticate(username=username, password=password)
        if not user:
            raise serializers.ValidationError({"error": "Invalid username or password"})
        else:
            return data

    def save(self, **kwargs):
        username = self.data.get("username")
        user = CustomUser.objects.get(username=username)
        refresh = RefreshToken.for_user(user)
        return {
            "username": user.user_role,
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }


class UserEditSerializer(serializers.ModelSerializer):
    date_birth = serializers.DateField(
        required=False, format="%Y-%m-%d", input_formats=["%Y-%m-%d", "iso-8601"]
    )

    class Meta:
        model = CustomUser
        fields = [
            "id",
            "first_name",
            "last_name",
            "email",
            "date_birth",
            "address",
            "postcode",
            "city",
            "gender",
            "specializations",
            "department",
            "is_superuser",
            "is_staff",
            "user_role",
            "phone_number",
            "id_card",
            "color",
        ]
        extra_kwargs = {
            "is_superuser": {"read_only": True},
            "is_staff": {"read_only": True},
            "company": {"required": True, "write_only": True},
        }


class CustomUserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        validators=[
            UniqueValidator(
                queryset=CustomUser.objects.all(),
                message="User with the same username already exists.",
            )
        ]
    )
    date_birth = serializers.DateField(
        required=False, format="%Y-%m-%d", input_formats=["%Y-%m-%d", "iso-8601"]
    )

    assigned_staff = serializers.SerializerMethodField()

    def get_assigned_staff(self, obj):
        data = {}
        if obj.user_role == "CLIENT":
            client = Client.objects.filter(user=obj).first()
            if client and client.assigned_staff:
                data = {
                    "id": client.assigned_staff.user.pk,
                    "name": f"{client.assigned_staff.user.first_name} {client.assigned_staff.user.last_name}",
                    "email": client.assigned_staff.user.email,
                }

        return data

    def validate_id_card(self, value):

        if value and self.initial_data.get("user_role") != "CLIENT":
            if CustomUser.objects.filter(id_card=value).exists():
                raise serializers.ValidationError("ID card number must be unique.")
        return value


    def validate(self, data):
        validated_data = data.copy()
        password = data.get("password", "")
        if password:
            validated_data["password"] = make_password(password)

        if 'user_role' not in validated_data or not validated_data['user_role']:
            raise serializers.ValidationError(
                {"user_role": "Role is required"})
                
        user_role = validated_data.get("user_role")
        phone_number = validated_data.get("phone_number", None)
        id_card = validated_data.get("id_card", None)

        user = self.context.get("user", None)

        if user_role == "ADMIN":
            validated_data["is_superuser"] = True
        if user_role == "STAFF" or user_role == "ADMIN":
            validated_data["is_staff"] = True
        # if user_role == "CLIENT" and not phone_number:
        #     raise serializers.ValidationError(
        #         {"phone_number": "Required field for clients"}
        #     )
        # if user_role == "CLIENT" and not id_card:
        #     raise serializers.ValidationError({"id_card": "Required field for clients"})

        if user_role == "CLIENT":
            if not phone_number:
                raise serializers.ValidationError(
                    {"phone_number": "Required field for patients"}
                )
        else:
            if not validated_data.get("id_card"):
                raise serializers.ValidationError(
                    {"id_card": "Required field for doctors/secretaries"}
                )

        return validated_data

    def create(self, validated_data):
        user_role = validated_data.get("user_role")
        color = validated_data.pop("color", None)
        # Remove non-patient fields for CLIENT role
        if user_role == "CLIENT":
            for field in ["id_card", "city", "address", "postcode", "gesy_number"]:
                validated_data.pop(field, None)

        user = CustomUser.objects.create(**validated_data)
        if user_role == "ADMIN":
            Admin.objects.create(user=user)
        elif user_role == "STAFF":
            Staff.objects.create(user=user)
            # user.color = color
            # user.save()
            if color:  # Only set color if provided
                user.color = color
                user.save()
        elif user_role == "CLIENT":
            Client.objects.create(user=user)
        return user

    class Meta:
        model = CustomUser
        fields = [
            "id",
            "first_name",
            "last_name",
            "email",
            "username",
            "date_birth",
            "address",
            "postcode",
            "city",
            "gender",
            "specializations",
            "department",
            "password",
            "is_superuser",
            "is_staff",
            "user_role",
            "phone_number",
            "id_card",
            "color",
            "assigned_staff",
            "gesy_number",
        ]
        extra_kwargs = {
            "password": {"write_only": True},
            "is_superuser": {"read_only": True},
            "is_staff": {"read_only": True},
            "user_role": {"required": True},
            "company": {"required": False,},
            "city": {"required": False},
            "address": {"required": False},
            "postcode": {"required": False},
            "gesy_number": {"required": False},
            "color": {"required": False},
        }


class CompanySerializer(serializers.ModelSerializer):

    class Meta:
        model = Company
        fields = "__all__"


class StaffSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer()

    class Meta:
        model = Staff
        exclude = ("id",)


class AdminSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer()

    class Meta:
        model = Admin
        exclude = ("id",)


class ClientSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer()
    client_id = serializers.SerializerMethodField()

    class Meta:
        model = Client
        fields = [
            "client_id",
            "user",
        ]  # Add all other fields you want to include in the response

    def get_client_id(self, obj):
        return obj.id


class AppointmentEditSerializer(serializers.ModelSerializer):
    client_id = serializers.PrimaryKeyRelatedField(
        required=True,
        write_only=True,
        queryset=Client.objects.all(),
        error_messages={"does_not_exist": "Invalid client ID"},
    )
    staff_id = serializers.PrimaryKeyRelatedField(
        required=True,
        write_only=True,
        queryset=Staff.objects.all(),
        error_messages={"does_not_exist": "Invalid staff ID"},
    )
    appointment_start_time_str = serializers.CharField(
        write_only=True,
        required=True,
        error_messages={"required": "appointment_start_time is required"},
    )
    appointment_finish_time_str = serializers.CharField(
        write_only=True,
        required=True,
        error_messages={"required": "appointment_finish_time is required"},
    )
    appointment_date = serializers.DateField(
        required=True,
        error_messages={"invalid": "Invalid date format for appointment_date."},
    )

    def validate_appointment_start_time_str(self, value):
        try:
            self.appointment_start_time = datetime.strptime(value, "%H:%M:%S").time()
        except:
            raise serializers.ValidationError(
                "Invalid time format for appointment_start_time"
            )
        return value

    def validate_appointment_finish_time_str(self, value):
        try:
            self.appointment_finish_time = datetime.strptime(value, "%H:%M:%S").time()
        except:
            raise serializers.ValidationError(
                "Invalid time format for appointment_finish_time"
            )
        return value

    class Meta:
        model = Appointment
        fields = (
            "client_id",
            "staff_id",
            "appointment_date",
            "appointment_start_time_str",
            "patient_informed",
            "patient_arival",
            "appointment_finish_time_str",
            "earlier_date",
            "reminder_two_day",
            "reminder_week",
        )


class AppointmentSerializer(serializers.ModelSerializer):
    client_id = serializers.PrimaryKeyRelatedField(
        required=True,
        write_only=True,
        queryset=Client.objects.all(),
        error_messages={"does_not_exist": "Invalid client ID"},
    )

    staff_id = serializers.PrimaryKeyRelatedField(
        required=True,
        write_only=True,
        queryset=Staff.objects.all(),
        error_messages={"does_not_exist": "Invalid staff ID"},
    )
    appointment_start_time_str = serializers.CharField(
        write_only=True,
        required=True,
        error_messages={"required": "appointment_start_time is required"},
    )
    appointment_finish_time_str = serializers.CharField(
        write_only=True,
        required=True,
        error_messages={"required": "appointment_finish_time is required"},
    )
    appointment_date = serializers.DateField(
        required=True,
        error_messages={"invalid": "Invalid date format for appointment_date."},
    )

    def validate_appointment_start_time_str(self, value):
        try:
            self.appointment_start_time = datetime.strptime(value, "%H:%M").time()
        except:
            raise serializers.ValidationError(
                "Invalid time format for appointment_start_time"
            )
        return value

    def validate_appointment_finish_time_str(self, value):
        try:
            self.appointment_finish_time = datetime.strptime(value, "%H:%M").time()
        except:
            raise serializers.ValidationError(
                "Invalid time format for appointment_finish_time"
            )
        return value

    def validate(self, data):
        user = self.context.get("user")
        appointment_date = data.get("appointment_date")
        appointment_start_datetime = datetime.combine(
            appointment_date, self.appointment_start_time
        )
        appointment_finish_datetime = datetime.combine(
            appointment_date, self.appointment_finish_time
        )
        client_id = data.get("client_id").pk
        staff_id = data.get("staff_id").pk

        # Additional permission check for admin role
        if user.user_role == "ADMIN":
            client = Client.objects.get(pk=client_id)
            staff = Staff.objects.get(pk=staff_id)
            client_company = client.user.company.pk if client.user.company else None
            staff_company = staff.user.company.pk if staff.user.company else None
            user_company = user.company.pk if user.company else None
            if (user_company != client_company and client_company is not None) or (
                user_company != staff_company and staff_company is not None
            ):
                raise PermissionDenied(
                    "You don't have permission to perform this action."
                )

        # Additional permission check for staff role
        if user.user_role == "STAFF":
            client = Client.objects.get(pk=client_id)
            assigned_staff = client.assigned_staff.pk if client.assigned_staff else None
            if assigned_staff != staff_id:
                raise PermissionDenied(
                    "You don't have permission to perform this action."
                )

        # Check if this staff has any conflicting appointments at the same time
        existing_appointments = Appointment.objects.filter(
            Q(staff=staff_id),  # Only check this staff's appointments
            Q(appointment_date=appointment_date),
            (
                Q(
                    appointment_start__lt=appointment_finish_datetime
                )  # Appointment starts before the new one ends
                & Q(
                    appointment_end__gt=appointment_start_datetime
                )  # Appointment ends after the new one starts
            ),
        )

        if existing_appointments.exists():
            raise ConflictError(
                {"error": "This staff is not available in this time slot."}
            )
        # Check if any existing appointment conflicts with the new appointment time
        # existing_appointments = Appointment.objects.filter(
        #     appointment_date=appointment_date,  # Same date
        #     appointment_start__lt=appointment_finish_datetime,  # Start before this appointment finishes
        #     appointment_end__gt=appointment_start_datetime  # End after this appointment starts
        # ).exclude(pk=self.instance.pk if self.instance else None)  # Exclude current appointment in case of update

        # # Raise an error if any conflicting appointment exists
        # if existing_appointments.exists():
        #     raise serializers.ValidationError({
        #         'error': 'There is already an appointment scheduled in this time slot.'
        #     })
        # If no conflicts, store the validated start and finish times
        self.start = appointment_start_datetime
        self.finish = appointment_finish_datetime
        return data

    def create(self, validated_data):
        check_appt = Appointment.objects.filter(
            client=validated_data.get("client_id"),
            staff=validated_data.get("staff_id"),
            earlier_date=validated_data.get("appointment_date"),
        )
        if check_appt.exists():
            appointment = check_appt.last()
            appointment.appointment_date = appointment.earlier_date
            appointment.earlier_date = None
            appointment.save()  # Ensure the instance is saved and returned properly
            return appointment
        appointment = Appointment.objects.create(
            client=validated_data.get("client_id"),
            staff=validated_data.get("staff_id"),
            appointment_start=self.start,
            appointment_end=self.finish,
            appointment_date=validated_data.get("appointment_date"),
            earlier_date=validated_data.get("earlier_date", ""),
        )
        return appointment

    class Meta:
        model = Appointment
        fields = (
            "client_id",
            "staff_id",
            "appointment_date",
            "appointment_start_time_str",
            "appointment_finish_time_str",
            "patient_arival",
            "patient_informed",
            "earlier_date",
            "reminder_week",
            "reminder_two_day",
        )

    def to_representation(self, instance):
        data = {}
        data["id"] = instance.id
        data["client_id"] = instance.client.id if instance.client else None
        data["client_name"] = (
            instance.client.user.first_name if instance.client else None
        )
        data["client_surname"] = (
            instance.client.user.last_name if instance.client else None
        )
        data["staff_id"] = instance.staff.id if instance.staff else None
        data["staff_name"] = instance.staff.user.first_name if instance.staff else None
        data["color"] = instance.staff.user.color if instance.staff else None
        data["staff_surname"] = (
            instance.staff.user.last_name if instance.staff else None
        )
        data["appointment_date"] = (
            instance.appointment_date.strftime("%Y-%m-%d")
            if instance.appointment_date
            else None
        )
        data["appointment_start"] = instance.appointment_start
        data["appointment_end"] = instance.appointment_end
        data["client_staff_id"] = (
            instance.client.assigned_staff.user.id if instance.client else None
        )
        data["patient_informed"] = instance.patient_informed
        data["patient_arival"] = instance.patient_arival
        data["earlier_date"] = instance.earlier_date
        data["reminder_week"] = instance.reminder_week
        data["reminder_two_day"] = instance.reminder_two_day

        return data


class AppointmentCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppointmentComment
        fields = ["appointment", "comment_text", "created_at", "visibility"]
        read_only_fields = ["created_at"]


################################################
# from rest_framework.views import APIView
# # from rest_framework.permissions import IsAdminOrStaf
# from rest_framework.permissions import IsAdminOrStaff

# class AssignmentSerializer(serializers.Serializer):
#     client_id = serializers.IntegerField(required=True, write_only=True, error_messages={'required': 'Please provide both client_id and staff_id.'})
#     staff_id = serializers.IntegerField(required=True, write_only=True, error_messages={'required': 'Please provide both client_id and staff_id.'})

#     def validate_client_id(self, value):
#         if not Client.objects.filter(pk=value).exists():
#             logger.debug(f'Client with id {value} not found.')
#             raise ValidationError(f'Client with id {value} not found.')
#         return value

#     def validate_staff_id(self, value):
#         if not Staff.objects.filter(pk=value).exists():
#             logger.debug(f'Staff with id {value} not found.')
#             raise ValidationError(f'Staff with id {value} not found.')
#         return value

#     def validate(self, data):
#         user = self.context.get('user')
#         client_id = data.get('client_id')
#         staff_id = data.get('staff_id')
#         client = Client.objects.get(pk=client_id)
#         staff = Staff.objects.get(pk=staff_id)
#         client_company = client.user.company.pk if client.user.company else None
#         staff_company = staff.user.company.pk if staff.user.company else None
#         user_company = user.company.pk if user.company else None
#         if (client_company != user_company) or (staff_company != user_company):
#             logger.debug(f'Permission denied: client_company={client_company}, staff_company={staff_company}, user_company={user_company}')
#             raise PermissionDenied("You don't have permission to perform this action.")
#         return data

#     def save(self, **kwargs):
#         client_id = self.validated_data.get("client_id")
#         staff_id = self.validated_data.get("staff_id")
#         client = Client.objects.get(pk=client_id)
#         staff = Staff.objects.get(pk=staff_id)
#         client.assigned_staff = staff
#         client.save()
#         logger.debug(f'Client {client_id} assigned to staff {staff_id}')
#         return


#############################################################
##               31_07_24
##
##
#############################################################
class AssignmentSerializer(serializers.Serializer):
    client_id = serializers.IntegerField(
        required=True,
        write_only=True,
        error_messages={"required": "Please provide both client_id and staff_id."},
    )
    staff_id = serializers.IntegerField(
        required=True,
        write_only=True,
        error_messages={"required": "Please provide both client_id and staff_id."},
    )

    def validate_client_id(self, value):
        if not Client.objects.filter(pk=value).exists():
            print("TEST-4")
            raise serializers.ValidationError(f"Client with id {value} not found.")
        return value

    def validate_staff_id(self, value):
        if not Staff.objects.filter(pk=value).exists():
            print("TEST-5")
            raise serializers.ValidationError(f"Staff with id {value} not found.")
        return value

    def validate(self, data):
        user = self.context.get("user")
        client_id = data.get("client_id")
        staff_id = data.get("staff_id")
        client = Client.objects.get(pk=client_id)
        staff = Staff.objects.get(pk=staff_id)
        client_company = client.user.company.pk if client.user.company else None
        staff_company = staff.user.company.pk if staff.user.company else None
        user_company = user.company.pk if user.company else None
        if (client_company != user_company) or (staff_company != user_company):
            raise PermissionDenied("You don't have permission to perform this action.")
        return data

    # def save(self, **kwargs):
    #     client_id = self.validated_data.get("client_id")
    #     staff_id = self.validated_data.get("staff_id")
    #     client = Client.objects.get(pk = client_id)
    #     staff = Staff.objects.get(pk=staff_id)
    #     client.assigned_staff = staff
    #     client.save()
    #     return


# # added for assigned clients to staff
# class AssignmentSerializer(serializers.Serializer):
#     client_id = serializers.IntegerField(
#         required=True,
#         write_only=True,
#         error_messages={'required': 'Please provide both client_id and staff_id.'}
#     )
#     staff_id = serializers.IntegerField(
#         required=True,
#         write_only=True,
#         error_messages={'required': 'Please provide both client_id and staff_id.'}
#     )

#     def validate_client_id(self, value):
#         if not Client.objects.filter(pk=value).exists():
#             logger.debug(f'Client with id {value} not found.')
#             raise serializers.ValidationError(f'Client with id {value} not found.')
#         return value

#     def validate_staff_id(self, value):
#         if not Staff.objects.filter(pk=value).exists():
#             logger.debug(f'Staff with id {value} not found.')
#             raise serializers.ValidationError(f'Staff with id {value} not found.')
#         return value

#     def validate(self, data):
#         user = self.context.get('user')
#         client_id = data.get('client_id')
#         staff_id = data.get('staff_id')
#         client = Client.objects.get(pk=client_id)
#         staff = Staff.objects.get(pk=staff_id)
#         client_company = client.user.company.pk if client.user.company else None
#         staff_company = staff.user.company.pk if staff.user.company else None
#         user_company = user.company.pk if user.company else None
#         if (client_company != user_company) or (staff_company != user_company):
#             logger.debug(f'Permission denied: client_company={client_company}, staff_company={staff_company}, user_company={user_company}')
#             raise PermissionDenied("You don't have permission to perform this action.")
#         return data

#     def save(self, **kwargs):
#         client_id = self.validated_data.get("client_id")
#         staff_id = self.validated_data.get("staff_id")
#         client = Client.objects.get(pk=client_id)
#         staff = Staff.objects.get(pk=staff_id)
#         client.assigned_staff = staff
#         client.save()
#         logger.debug(f'Client {client_id} assigned to staff {staff_id}')
#         return


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "content", "status", "author", "created_at", "updated_at"]
        read_only_fields = ["author", "created_at", "updated_at"]


class TaskSerializer(serializers.ModelSerializer):
    assigned_admins_usernames = serializers.SerializerMethodField()

    class Meta:
        model = Task
        fields = [
            "id",
            "description",
            "start_date",
            "expected_completion_date",
            "created_by",
            "assigned_admins_usernames",
            "status",
            "created_at",
            "updated_at",
            "assigned_admins",
        ]
        read_only_fields = ["created_by", "status", "created_at", "updated_at"]

    def get_assigned_admins_usernames(self, obj):
        # Return a list of usernames of the assigned admins
        return [admin.username for admin in obj.assigned_admins.all()]


class TaskCommentSerializer(serializers.ModelSerializer):
    author_username = serializers.SerializerMethodField()

    class Meta:
        model = TaskComment
        fields = ["id", "task", "comment", "author", "created_at", "author_username"]
        read_only_fields = ["author", "created_at", "author_username"]

    def get_author_username(self, obj):
        return obj.author.username  # Access the author's username
