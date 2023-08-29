from django.contrib.auth.models import AbstractUser
from django.db import models

from Manager import settings


class Tasks(models.Model):
    title = models.CharField(max_length=30, verbose_name='Название', db_index=True)
    description = models.TextField(verbose_name='Описание')
    time_complete = models.DateTimeField(null=True, verbose_name='Описание')
    time_create = models.DateTimeField(auto_now_add=True, verbose_name='Время создания')
    time_update = models.DateTimeField(auto_now=True, verbose_name='Время изменения')
    comment = models.JSONField(null=True, verbose_name='Комментарии к задаче')
    is_complete = models.BooleanField(default=False, verbose_name='Выполнено')
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)

    class Meta:
        ordering = ['time_complete']


class User(AbstractUser):
    completed_tasks = models.IntegerField(default=0, verbose_name='Выполнено задач')
    sections = models.JSONField(verbose_name='Разделы задач', null=True)
    photo = models.ImageField(upload_to="user-photo/", verbose_name='Фото', null=True)
    first_name = models.CharField(max_length=150, verbose_name='Имя')
    last_name = models.CharField(max_length=150, verbose_name='Фамилия')
