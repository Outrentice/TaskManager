# Generated by Django 4.2 on 2023-05-03 11:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('task', '0009_alter_user_photo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='photo',
            field=models.ImageField(null=True, upload_to='media/userphoto', verbose_name='Фото'),
        ),
    ]
