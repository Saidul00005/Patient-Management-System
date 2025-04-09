from .serializers import *
from rest_framework_simplejwt.views import TokenViewBase
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics, status, serializers
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .models import CustomUser
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.core.mail import EmailMultiAlternatives
from datetime import timedelta
from django.conf import settings
from .utils import validate_token

# from authentication.serializers import CustomPasswordResetSerializer

class CustomPasswordResetView(generics.UpdateAPIView):
    serializer_class = CustomPasswordResetSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)

        # Your password update logic here
        new_password = serializer.validated_data.get('new_password1')
        print(new_password)
        instance.set_password(new_password)
        instance.save()

        return Response({'detail': 'Password successfully reset.'}, status=status.HTTP_200_OK)


    
class CustomJWTAuthentication(JWTAuthentication):

    def authenticate(self, request):
        user = super().authenticate(request)
        if user is None:
            # return Response({'message': 'Login failed.'}, status=status.HTTP_400_BAD_REQUEST)
            raise AuthenticationFailed('Sorry, you are unauthorized.')

        return user


class TokenRefreshView(TokenViewBase):
    """
        Renew tokens (access and refresh) with new expire time based on specific user's access token.
    """
    serializer_class = TokenRefreshLifetimeSerializer


class ObtainTokenPairWithColorView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    permission_classes = []


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response("Logged out successfully",status=status.HTTP_200_OK)
        except Exception :
            return Response("Invalid or missing refresh token",status=status.HTTP_400_BAD_REQUEST)


class RequestResetLink(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email', None)
        print(email)
        # Check if the email is provided
        if not email:
            return Response({"email": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)

        # Check if the user with the provided email exists
        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            return Response({"email": "Email is not registered"}, status=status.HTTP_400_BAD_REQUEST)

        # Generate the token
        token = RefreshToken.for_user(user)
        token.set_exp(lifetime=timedelta(hours=2))
        
        # Email setup
        subject = "Reset your password"
        from_email = settings.EMAIL_HOST_USER
        to_email = [email]
        context = {
            'url': f"{settings.RESET_URL}/reset-password?token={token}"  # Assuming RESET_URL ends with a slash
        }
        
        # Prepare email content
        html_content = render_to_string('authentication/resetPassword.html', context)
        text_content = strip_tags(html_content)

        # Send email
        email_message = EmailMultiAlternatives(subject, text_content, from_email, to_email)
        email_message.attach_alternative(html_content, 'text/html')
        email_message.send()

        return Response({"message": "Reset email sent successfully"}, status=status.HTTP_200_OK)

class ValidateResetLink(APIView):
    permission_classes = [AllowAny,]

    def post(self,request):
        token = request.data.get('token',None)
        if not token:
            return Response({"token":"Token is required"},status = status.HTTP_400_BAD_REQUEST)
        token_status = validate_token(token) 
        if token_status == "VALID":
            return Response("Reset link is valid",status = status.HTTP_200_OK)
        else:
            return Response({"token":token_status},status = status.HTTP_400_BAD_REQUEST)
        
class ResetPassword(APIView):
    permission_classes = [AllowAny,]
    serializer_class = PasswordResetSerializer

    def put(self, request):
        # Extract the token from the request data
        token = request.data.get('token')

        # Validate the token
        token_status = validate_token(token)

        # Check if token is not valid and return an error if it's invalid
        if token_status != "VALID":
            return Response({"token": token_status}, status=status.HTTP_400_BAD_REQUEST)

        # If the token is valid, proceed with the serializer to reset the password
        serializer = self.serializer_class(data=request.data)

        # Check if the serializer is valid
        if serializer.is_valid():
            # Save the serializer (this handles password reset and token blacklisting)
            serializer.save()
            return Response("Password reset successfully", status=status.HTTP_200_OK)

        # Log validation errors for debugging
        print("Validation errors:", serializer.errors)

        # Return validation errors in response if serializer is invalid
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



