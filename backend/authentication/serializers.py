from .models import CustomUser
from rest_framework_simplejwt.serializers import (
    TokenObtainPairSerializer,
    TokenRefreshSerializer,
)
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import serializers
from .utils import validate_token
from jwt import decode as jwt_decode
from django.conf import settings
import jwt


from authentication.models import Staff, Client, ClientComment


class CustomPasswordResetSerializer(serializers.Serializer):
    old_password = serializers.CharField(
        write_only=True, required=True, style={"input_type": "password"}
    )
    new_password1 = serializers.CharField(
        write_only=True, required=True, style={"input_type": "password"}
    )
    new_password2 = serializers.CharField(
        write_only=True, required=True, style={"input_type": "password"}
    )

    def validate(self, data):
        # Validate that the new passwords match
        if data["new_password1"] != data["new_password2"]:
            raise serializers.ValidationError("New passwords do not match.")

        # Validate old password
        user = self.context["request"].user
        if not user.check_password(data["old_password"]):
            raise serializers.ValidationError("Old password is incorrect.")

        return data


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

        # Extract the user instance from the validated data
        user = self.user

        # Include user information in the response
        data["user"] = {
            "id": user.pk,
            "username": user.username,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "user_role": user.user_role,
            "gdpr_accepted": user.gdpr_accepted,
        }

        # Optionally, you can add additional custom claims to the token payload
        token = self.get_token(user)
        data["access"] = str(token.access_token)
        data["refresh"] = str(token)

        return data

    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)

        # Add custom claims
        return token

    class Meta:
        model = CustomUser
        fields = "__all__"


class PasswordResetSerializer(serializers.Serializer):
    password = serializers.CharField(required=True)
    token = serializers.CharField(required=True)

    def validate_token(self, value):
        token_status = validate_token(value)
        if token_status == "VALID":
            return value
        else:
            raise serializers.ValidationError(token_status)

    def save(self, **kwargs):
        token = self.validated_data.get("token")
        password = self.validated_data.get("password")
        decoded_token = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[
                "HS256",
            ],
        )
        user = CustomUser.objects.get(id=decoded_token.get("user_id"))
        user.set_password(password)
        user.save()

        try:
            refresh_token = RefreshToken(token)
            refresh_token.blacklist()
        except Exception:
            pass


class StaffUserSerializer(serializers.ModelSerializer):
    custom_user = serializers.SerializerMethodField(method_name="get_user")

    def get_user(self, obj):
        return {
            "id": obj.user.id,
            "first_name": obj.user.first_name,
            "last_name": obj.user.last_name,
            "email": obj.user.email,
        }

    class Meta:
        model = Staff
        fields = "__all__"


class ClientUserSerializer(serializers.ModelSerializer):
    custom_user = serializers.SerializerMethodField(method_name="get_user")

    def get_user(self, obj):
        return {
            "id": obj.user.id,
            "first_name": obj.user.first_name,
            "last_name": obj.user.last_name,
            "email": obj.user.email,
        }

    class Meta:
        model = Client
        fields = "__all__"


class ClientCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientComment
        fields = ["user", "comment_text", "created_at", "visibility"]
        read_only_fields = ["created_at", "user"]
