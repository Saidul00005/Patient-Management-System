from django.urls import path
from .views import *
                    

urlpatterns = [
    path('token/obtain/', ObtainTokenPairWithColorView.as_view(), name='obtain_token'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('password_reset/', CustomPasswordResetView.as_view(), name='custom_password_reset'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('forgot_password/',RequestResetLink.as_view(),name="forgot-password"),
    path('validate_reset',ValidateResetLink.as_view(),name="validate-reset"),
    path('reset_password',ResetPassword.as_view(),name="reset-password"),
]
