from django.contrib import admin

from authentication.models import *

# Register your models here.


# @admin.register(CustomUser)
# class StudentAdmin(admin.ModelAdmin):
#     list_display = ['id', 'username', 'password', 'city', 'user_role']

admin.site.register(Company)

class ClientAdmin(admin.ModelAdmin):
    list_display = ('user', )

admin.site.register(Client, ClientAdmin)

class StaffAdmin(admin.ModelAdmin):
    list_display = ('user', )

admin.site.register(Staff, StaffAdmin)

admin.site.register(Admin)

class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'user_role', 'date_joined', 'date_birth', 'gender', )

admin.site.register(CustomUser, UserAdmin)
