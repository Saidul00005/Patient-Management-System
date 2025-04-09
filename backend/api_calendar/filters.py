from rest_framework.filters import BaseFilterBackend

class UserSearchFilter(BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        first_name = request.query_params.get('first_name', None)
        last_name = request.query_params.get('last_name', None)
        id_number = request.query_params.get('id_number', None)
        username = request.query_params.get('username', None) 
        id_card = request.query_params.get('id_card', None) 
        if id_card:
            queryset = queryset.filter(id_card__iexact = id_card)
        if first_name:
            queryset = queryset.filter(first_name__iexact = first_name)
        if last_name:
            queryset = queryset.filter(last_name__iexact = last_name)
        if id_number:
            queryset = queryset.filter(id = id_number)
        if username:
            queryset = queryset.filter(username__iexact = username)
        return queryset
    