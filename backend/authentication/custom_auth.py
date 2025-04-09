from authentication.serializers import MyTokenObtainPairSerializer, TokenRefreshLifetimeSerializer
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.views import TokenViewBase
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import BasePermission
from .models import *
from rest_framework.exceptions import PermissionDenied


# class RegisterPermissions(BasePermission):
#     def has_permission(self, request, view):
#         # COMMENT THIS #
#         # if request.user.is_anonymous:
#         #     return True
#         # else:
#         #  END OF COMMENT #
#         if request.user and request.user.is_authenticated:
#             if request.user.user_role == "CLIENT":
#                 raise PermissionDenied({'message': 'Clients cannot create staff, admin, or client users.'})
#             else:
#                 return True
#         else:
#             return False
        

class IsAdminOrStaff(BasePermission):
    def has_permission(self, request, view):
        if request.user and request.user.is_authenticated:
            if request.user.user_role == "CLIENT":
                raise PermissionDenied({'message': 'Action reserved only for admins and staff'})
            return True
        return False

    def has_object_permission(self, request, view, obj):
        if request.user.is_superuser:
            return True
        if request.user.user_role == "STAFF":
            # Check if the object is a client and the assigned staff is the current user
            if hasattr(obj, 'assigned_staff') and obj.assigned_staff and obj.assigned_staff.user == request.user:
                return True
        return False
        
class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        if request.user and request.user.is_authenticated:
            if request.user.user_role != "ADMIN":
                raise PermissionDenied({'message': 'Action Reserved only for administrators'})
            else:
                return True
        else:
            return False
    
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
