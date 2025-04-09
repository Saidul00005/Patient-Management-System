from django.contrib import admin


from django.urls import path, include
from django.contrib.auth.views import PasswordResetView
from api_calendar.views import home


urlpatterns = [
    # path('api/', include('api_calendar.api_urls')),  # Include your API URLs
    path('admin/', admin.site.urls),
    path("", home, name="home"),
    path("api/", include("api_calendar.urls")),
    path("auth/", include("authentication.urls")),

    path('password_reset/', PasswordResetView.as_view(), name='password_reset'),

    path('dj-rest-auth/', include('dj_rest_auth.urls'))
    # ... other URLs ...
]
