# Generated by Django 4.2 on 2023-05-03 10:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('task', '0005_alter_tasks_options_alter_tasks_title_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='photo',
            field=models.ImageField(null=True, upload_to='user-photo/', verbose_name='Фото'),
        ),
    ]
