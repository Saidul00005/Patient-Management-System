from django.urls import path
from .views import *

# from .views import GetCombinedUserAndStaffClients

urlpatterns = [
    path("company/create/", CreateCompany.as_view(), name="create-company"),
    path("company/", CompanyView.as_view(), name="company"),
    path("company/<int:id>", CompanyUpdateView.as_view(), name="companyupdate"),
    path("user/profile/", GetProfile.as_view(), name="user-profile"),
    path("login_user/", Login.as_view(), name="login_user"),
    # path('user/create/', CreateUserView.as_view(), name='create-user'),
    path("user/", UserView.as_view(), name="create_user"),
    path("user/<int:pk>/", UserView.as_view(), name="modify_user"),
    path("user-edit/<int:pk>/", UserEditView.as_view(), name="edit_user"),
    path("print_all_users/", PrintUsers.as_view(), name="print_all_users"),
    path("search-user/", SearchUsers.as_view(), name="search-user"),
    path("download_excelData/", download_excelData, name="download_excelData"),
    path(
        "excel_document_of_appointments/",
        ExportAppointmentsToExcel.as_view(),
        name="excel_document_of_appointments",
    ),
    path(
        "excel_document_of_email_sms/",
        ExportEmailSMSToExcel.as_view(),
        name="excel_document_of_email_sms",
    ),
    path("appointment/", AppointmentView.as_view(), name="create_appointment"),
    path(
        "client-appointments/<int:pk>/",
        ClientAppointmentView.as_view(),
        name="client_appointment",
    ),
    path("send_email/", SendEmailView.as_view(), name="send_email"),
    path("appointment/<int:pk>/", AppointmentView.as_view(), name="modify_appointment"),
    path(
        "appointment-edit/<int:pk>/",
        AppointmentEditView.as_view(),
        name="edit_appointment",
    ),
    path(
        "comments/create/",
        CreateAppointmentCommentView.as_view(),
        name="create_appointment_comment",
    ),
    path(
        "comments/<int:appointment_id>/",
        AppointmentCommentListView.as_view(),
        name="appointment-comments",
    ),
    # path('my_appointments/comments/<int:appointment_id>/', AppointmentCommentListView.as_view(), name='appointment-comments'),
    path(
        "client-comments/create/",
        CreateClientCommentView.as_view(),
        name="create_client_comment",
    ),
    path(
        "assign_client_to_staff/",
        AssignClientToStaff.as_view(),
        name="assign_client_to_staff",
    ),
    path(
        "staff_with_assigned_clients/",
        GetStaffWithAssignedClients.as_view(),
        name="staff_with_assigned_clients",
    ),
    path(
        "print_appointments/",
        PrintAppointments.as_view(),
        name="print_all_appointments",
    ),
    path("my_appointments/", MyAppointments.as_view(), name="my_appointments"),
    path(
        "send_appointment_info/<int:appointment_id>/",
        SendAppointmentInfo.as_view(),
        name="send-appointment-info",
    ),
    path("clientStats/", GeneralClientStats.as_view(), name="client-stats"),
    path(
        "clientStats/week/<str:weekstart>/",
        ClientStatsByWeek.as_view(),
        name="weekly-client-stats",
    ),
    path(
        "clientStats/month/<str:month_string>/",
        ClientStatsByMonth.as_view(),
        name="monthly-client-stats",
    ),
    path(
        "clientStats/year/<int:year>/",
        ClientStatsByYear.as_view(),
        name="yearly-client-stats",
    ),
    path(
        "appointmentStats/", GeneralAppointmentStats.as_view(), name="appointment-stats"
    ),
    path(
        "missing-appointment/week/<str:weekstart>/",
        PatientMissedAppoinmentByWeek.as_view(),
        name="weekly-missing-appointment-stats",
    ),
    path(
        "missing-appointment/month/<str:month_string>/",
        PatientMissedAppointmentStatsByMonth.as_view(),
        name="monthly-missing-appointment-stats",
    ),
    path(
        "missing-appointment/year/<int:year>/",
        PatientMissedAppointmentStatsByYear.as_view(),
        name="yearly-missing-appointment-stats",
    ),
    path(
        "appointmentStats/week/<str:weekstart>/",
        AppointmentStatsByWeek.as_view(),
        name="weekly-appointment-stats",
    ),
    path(
        "appointmentStats/month/<str:month_string>/",
        AppointmentStatsByMonth.as_view(),
        name="monthly-appointment-stats",
    ),
    path(
        "appointmentStats/year/<int:year>/",
        AppointmentStatsByYear.as_view(),
        name="yearly-appointment-stats",
    ),
    path(
        "assignedClientStats/",
        GeneralAssignedClientStats.as_view(),
        name="assigned-clients-stats",
    ),
    path(
        "assignedClientStats/week/<str:weekstart>/",
        AssignedClientStatsByWeek.as_view(),
        name="weekly-assigned-clients-stats",
    ),
    path(
        "assignedClientStats/month/<str:month_string>/",
        AssignedClientStatsByMonth.as_view(),
        name="monthly-assigned-clients-stats",
    ),
    path(
        "assignedClientStats/year/<int:year>/",
        AssignedClientStatsByYear.as_view(),
        name="yearly-assigned-clients-stats",
    ),
    ########################
    path(
        "CombinedUserAndStaffClientalls",
        GetCombinedUserAndStaffClients.as_view(),
        name="CombinedUserAndStaffClientalls",
    ),
    # path('staff_with_assigned_clients/', GetStaffWithAssignedClients.as_view(), name='staff_with_assigned_clients'),
    path(
        "appointments/<int:appointment_id>/",
        EditAppointment.as_view(),
        name="edit_appointment",
    ),
    # path('appointments/<int:appointment_id>/', DeleteAppointment.as_view(), name='delete_appointment'),
    path("delete-user/<int:user_id>/", DeleteUserView.as_view(), name="delete_user"),
    path("edit-user/<int:user_id>/", EditUserView.as_view(), name="edit_user"),
    # path('api/delete-user/<int:user_id>/', DeleteUserView.as_view(), name='delete_user'),
    ########################
    path("staff-users/", StaffUserListView.as_view(), name="staff_users"),
    path("client-users/", ClientUserListView.as_view(), name="client_users"),
    #####################################
    path(
        "clientAgeStats/year/<int:year>/",
        ClientAgeStatsByYear.as_view(),
        name="yearly-client-age-stats",
    ),
    path(
        "clientAgeStats/month/<str:month_string>/",
        ClientAgeStatsByMonth.as_view(),
        name="monthly-client-age-stats",
    ),
    path(
        "clientAgeStats/week/<str:week_start_date>/",
        ClientAgeStatsByWeek.as_view(),
        name="weekly-client-age-stats",
    ),
    ########################
    path(
        "appointment-send-info/stats/",
        AppointmentSendInfoStatsView.as_view(),
        name="appointment_send_info_stats",
    ),
    path("create-note/", NoteCreate.as_view()),
    path("task-management/", TaskManagement.as_view()),
    path("send-task-email/", SendTaskEmailAPIView.as_view()),
    path("task-comment/", TaskCommentView.as_view()),
    path("gdpr-report/", GenerateUserPDF.as_view()),
    path("gdpr/accept/", GDPRAcceptView.as_view(), name="gdpr_accept"),
]
