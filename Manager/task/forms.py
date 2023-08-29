from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm


from .models import *


class RegisterUserForm(UserCreationForm):
    username = forms.CharField(label='Логин', widget=forms.TextInput(attrs={'placeholder': 'Логин'}))
    email = forms.CharField(label='Email', widget=forms.TextInput(attrs={'placeholder': 'Email', 'type': 'email'}))
    first_name = forms.CharField(label='Имя', widget=forms.TextInput(attrs={'placeholder': 'Имя'}))
    last_name = forms.CharField(label='Фамилия', widget=forms.TextInput(attrs={'placeholder': 'Фамилия'}))
    password1 = forms.CharField(label='Пароль', widget=forms.TextInput(attrs={'placeholder': 'Пароль', 'type': 'password'}))
    password2 = forms.CharField(label='Повторите пароль', widget=forms.TextInput(attrs={'placeholder': 'Повторите пароль', 'type': 'password'}))


    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name', 'password1', 'password2']


class LoginUserForm(AuthenticationForm):
    username = forms.CharField(label='Логин', widget=forms.TextInput(attrs={'placeholder': 'Логин'}))
    password = forms.CharField(label='Пароль', widget=forms.TextInput(attrs={'placeholder': 'Пароль', 'type': 'password'}))

    class Meta:
        model = User
        fields = ['username', 'password']


class AddTaskForm(forms.Form):
    title = forms.CharField(widget=forms.TextInput(
        attrs={'placeholder': '...', "oninput": "ChangeTitle(this)", "name": "title", 'id': 'add-task-title'}))
    time_complete = forms.CharField(widget=forms.TextInput(
        attrs={"type": "datetime-local", "name": "title", 'id': 'add-task-time'}))
    description = forms.CharField(widget=forms.Textarea(attrs={'placeholder': '...', 'rows': 3, 'id': 'add-task-descrption'}))

    class Meta:
        model = Tasks
        fields = ['title', 'time_complete', 'description']