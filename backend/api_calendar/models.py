from django.db import models
from django.utils import timezone
from authentication.models import Client, Staff, CustomUser


class Appointment(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE, null=True, blank=True)
    staff = models.ForeignKey(Staff, on_delete=models.CASCADE, null=True, blank=True)
    # added 21_02_2024
    # appointment_datetime = models.DateTimeField(null=True, blank=True)
    # appointment_start = models.DateTimeField(null=True, blank=True)
    # appointment_end = models.DateTimeField(null=True, blank=True)
    appointment_start = models.TimeField(null=True, blank=True)
    appointment_end = models.TimeField(null=True, blank=True)
    appointment_date = models.DateField(null=True, blank=True)
    patient_arival = models.BooleanField(default=False)
    patient_informed = models.BooleanField(default=False)
    earlier_date = models.DateField(null=True, blank=True)
    reminder_two_day = models.BooleanField(default=False)
    reminder_week = models.BooleanField(default=False)


class Company(models.Model):
    name = models.CharField(max_length=100)


class SendType(models.TextChoices):
    EMAIL = "EMAIL", "Email"
    SMS = "SMS", "SMS"


class AppointmentSendInfo(models.Model):
    staff = models.ForeignKey(Staff, on_delete=models.CASCADE)
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    type = models.CharField(max_length=30, choices=SendType.choices)
    message = models.TextField()
    send_at = models.DateTimeField()
    error = models.TextField(null=True, blank=True)
    send_per_year = models.IntegerField(null=True, blank=True)
    send_per_month = models.IntegerField(null=True, blank=True)
    send_per_week = models.IntegerField(null=True, blank=True)

    @property
    def total_send(self):
        return AppointmentSendInfo.objects.count()

    def sends_per_year(self, year=None):
        if year is None:
            year = timezone.now().year
        return AppointmentSendInfo.objects.filter(send_at__year=year).count()

    def sends_per_month(self, year=None, month=None):
        if year is None:
            year = timezone.now().year
        if month is None:
            month = timezone.now().month
        return AppointmentSendInfo.objects.filter(
            send_at__year=year, send_at__month=month
        ).count()

    def sends_per_week(self, year=None, week=None):
        if year is None:
            year = timezone.now().year
        if week is None:
            week = timezone.now().isocalendar()[1]
        return AppointmentSendInfo.objects.filter(
            send_at__year=year, send_at__week=week
        ).count()

    def save(self, *args, **kwargs):
        self.send_per_year = self.sends_per_year()
        self.send_per_month = self.sends_per_month()
        self.send_per_week = self.sends_per_week()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.staff.user.username}-{self.client.user.username}-{self.type}"

    class Meta:
        verbose_name = "Email / SMS send"
        verbose_name_plural = "Email / SMS sends"


class AppointmentComment(models.Model):
    appointment = models.ForeignKey(
        Appointment, on_delete=models.CASCADE, related_name="comments"
    )
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    comment_text = models.TextField()
    visibility = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment by {self.user.username} on {self.appointment.id}"

    class Meta:
        verbose_name = "Appointment Comment"
        verbose_name_plural = "Appointment Comments"


class Note(models.Model):
    content = models.TextField()
    status = models.CharField(max_length=100, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    author = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="notes"
    )


class Task(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("in_progress", "In Progress"),
        ("completed", "Completed"),
    ]

    description = models.TextField()
    start_date = models.DateField()
    expected_completion_date = models.DateField()
    assigned_admins = models.ManyToManyField(CustomUser, related_name="assigned_tasks")
    created_by = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="created_tasks"
    )
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Task: {self.description[:20]}"


class TaskComment(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name="comments")
    comment = models.TextField()
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
