from django.urls import path
from .views import (
    register_user,
    login_user,
    submit_feedback,
    feedback_stats,
    get_all_feedback,   # ✅ add
    delete_user,        # ✅ add
    upload_csv
)

urlpatterns = [
    path('register/', register_user),
    path('login/', login_user),
    path('submit/', submit_feedback),
    path('stats/', feedback_stats),

    # ✅ NEW ADMIN ROUTES
    path('all-feedback/', get_all_feedback),
    path('delete-user/<int:id>/', delete_user),
    path('upload-csv/', upload_csv),
]