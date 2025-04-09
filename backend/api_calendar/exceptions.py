from rest_framework.exceptions import APIException

class ConflictError(APIException):
    status_code = 409
    default_detail = 'Conflict error occurred.'
    default_code = 'conflict'