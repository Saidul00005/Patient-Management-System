import jwt
from django.conf import settings
from rest_framework_simplejwt.tokens import RefreshToken
from .models import CustomUser

def validate_token(token):
    try:
        decoded_token = jwt.decode(token, settings.SECRET_KEY, algorithms= ['HS256',])
        try:
            RefreshToken(token)
        except:
            return "USED LINK"
        if not CustomUser.objects.filter(id = decoded_token['user_id']).exists():
            return "INVALID LINK"
        return "VALID"
    except jwt.ExpiredSignatureError:
        return "EXPIRED LINK"
    except:
        return "INVALID LINK"