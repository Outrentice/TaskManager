from django.conf.urls.static import static
from django.urls import path

from .views import *


urlpatterns = [
    path('', AddTask.as_view(), name='home'),
    path('register/', RegisterUser.as_view(), name='register'),
    path('login/', LoginUser.as_view(), name='login'),
    # path('add/', AddTask.as_view(), name='add_task'),
    path('logout/', logout_user, name='logout'),
    path('delete-task', delete_task, name='delete'),  # ajax
    path('edit-task', edit_task, name='edit'),  # ajax
    path('update-complete', update_count_complete, name='update-count'),  # ajax
    path('add-comment', add_comment, name='add-comment'),  # ajax
    path('edit-settings', edit_settings, name='edit_settings'),  # ajax
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)