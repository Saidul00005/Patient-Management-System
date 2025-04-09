from django.contrib import admin
from .models import Appointment, AppointmentSendInfo,AppointmentComment,Task,Note,TaskComment
from django.contrib.auth.models import Permission
from .models import Company

admin.site.register(Appointment)
admin.site.register(AppointmentComment)
admin.site.register(Permission)
admin.site.register(Company)
admin.site.register(AppointmentSendInfo)

admin.site.register(Note)
admin.site.register(Task)
admin.site.register(TaskComment)
