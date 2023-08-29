import os
import shutil

from django.contrib.auth import logout
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.views import LoginView
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.urls import reverse_lazy

from django.views.generic import ListView, CreateView, FormView

from Manager.settings import BASE_DIR
from .forms import *
from .models import *

from datetime import datetime
from datetime import timedelta
from calendar import monthrange
import base64


class HomePage(LoginRequiredMixin, ListView):
    model = Tasks
    template_name = 'task/index.html'
    context_object_name = 'tasks'

    def get_context_data(self, *, object_list=None, **kwargs):
        date = datetime.now().strftime("%B, %Y, %m").split(', ')
        predmonth = int(date[2]) - 1 if int(date[2]) > 1 else 12

        context = super().get_context_data(**kwargs)
        context['title'] = 'Stade'
        context['inputid'] = 1
        context['current_month'] = date[0]
        context['current_year'] = date[1]
        context['count_days'] = list(monthrange(int(context['current_year']), int(date[2])))

        previousmonth = list(monthrange(int(context['current_year']), int(predmonth)))

        context['count_days'][0] = range(previousmonth[1] - context['count_days'][0] + 1, previousmonth[1] + 1)
        context['count_days'][1] = range(1, context['count_days'][1] + 1)
        return context

    def get_queryset(self):
        return Tasks.objects.filter(user_id=self.request.user.id).select_related('user_id')


class AddTask(HomePage, FormView):
    form_class = AddTaskForm
    template_name = 'task/index.html'

    def form_valid(self, form):
        user_id = User.objects.get(id=self.request.user.id)
        description = form.cleaned_data['description'].replace('"', '”')
        title = form.cleaned_data['title'].replace('"', '”')

        Tasks.objects.create(title=title, description=description,
                             time_complete=form.cleaned_data['time_complete'], user_id=user_id)
        return redirect('home')

    def get_success_url(self):
        return reverse_lazy('home')



class RegisterUser(CreateView):
    form_class = RegisterUserForm
    template_name = 'task/register.html'

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Stade'
        return context

    def form_valid(self, form):
        form.save()

        time_complete = datetime.now() + timedelta(days=1)
        user_id = User.objects.get(username=form.cleaned_data.get('username'))
        Tasks.objects.create(title='Тестовая', description='Тестовая', time_complete=time_complete, user_id=user_id)
        return redirect('home')

    def get_success_url(self):
        return reverse_lazy('home')


class LoginUser(LoginView):
    form_class = LoginUserForm
    template_name = 'task/login.html'

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Stade'
        return context

    def get_success_url(self):
        return reverse_lazy('home')


def delete_task(request):
    if request.method == 'POST':
        if not request.POST.get('id_comment'):
            task = Tasks.objects.get(id=request.POST.get('id'))

            if task.comment:
                if os.path.exists('media/task-comment/' + request.POST.get('id')):
                    shutil.rmtree('media/task-comment/' + request.POST.get('id'))

            task.delete()
        else:
            task = Tasks.objects.get(id=request.POST.get('id'))

            task_comment = task.comment
            comment = task.comment[int(request.POST.get('id_comment'))]

            if comment.get('file'):
                if os.path.isfile('media/' + comment['file']):
                    os.remove('media/' + comment['file'])

            task_comment.pop(int(request.POST.get('id_comment')))
            task.comment = task_comment

            task.save()
    return redirect('home')


def edit_task(request):
    if request.method == 'POST':
        if not request.POST.get('title').strip():
            return JsonResponse(data={'error': 'Поле "title" не должно быть пустым'}, status=400)
        if not request.POST.get('description').strip():
            return JsonResponse(data={'error': 'Описание не должно быть пустым'}, status=400)

        Task = Tasks.objects.get(id=request.POST.get('id'))
        Task.title = request.POST.get('title').strip()

        if request.POST.get('date'):
            Task.time_complete = request.POST.get('date')

        if request.POST.get('comments_text[0]'):
            task_comment = Task.comment
            for i in range(len(task_comment)):
                if request.POST.get(f'comments_text[{i}]').strip():
                    task_comment[i]['text'] = request.POST.get(f'comments_text[{i}]').strip()
                else:
                    return JsonResponse(data={'error': 'Комментарии не должны быть пустыми'}, status=400)
            Task.comment = task_comment
        elif request.POST.get('comments_text[0]') == '':
            return JsonResponse(data={'error': 'Комментарии не должны быть пустыми'}, status=400)

        Task.description = request.POST.get('description').strip()
        Task.save()

        return JsonResponse(data={}, status=201)
    else:
        return redirect('home')

def add_comment(request):
    if request.method == 'POST':
        task_update = Tasks.objects.get(id=request.POST.get('id'))

        comment_now = {
            'text': request.POST.get('text').strip(),
            'time': request.POST.get('date[time]'),
            'day': request.POST.get('date[day]'),
            'month': request.POST.get('date[month]'),
            'year': request.POST.get('date[year]')
        }

        if request.POST.get('file'):
            src = f"task-comment/{request.POST.get('id')}/{request.POST.get('file_name')}"

            if not os.path.isdir(f"media/task-comment/{request.POST.get('id')}"):
                os.mkdir(f"media/task-comment/{request.POST.get('id')}")

            with open(f"media/{src}", "wb") as f:
                f.write(base64.b64decode(request.POST.get('file')))

            comment_now['file'] = src

        if task_update.comment:
            dict_comment = task_update.comment #СОХРАНИТЬ В БД
            dict_comment.append(comment_now)
            task_update.comment = dict_comment
        else:
            task_update.comment = [comment_now]

        task_update.save()

        return JsonResponse(data={}, status=201)

def update_count_complete(request):
    if request.method == 'POST':
        Task_update = Tasks.objects.get(id=request.POST.get('id'))
        user = User.objects.get(id=Task_update.user_id_id)
        if request.POST.get('action') == 'add':
            Task_update.is_complete = True
            user.completed_tasks += 1
        elif request.POST.get('action') == 'reduce':
            Task_update.is_complete = False
            user.completed_tasks -= 1

        user.save()
        Task_update.save()

        return JsonResponse(data={}, status=201)

def edit_settings(request):
    if request.method == 'POST':
        user_edit = User.objects.get(id=request.POST.get('id'))

        if request.POST.get('photo'):
            src = f"{request.POST.get('id')}.jpg"
            user_edit.photo = 'user-photo/' + src

            with open(f"media/user-photo/{src}", "wb") as f:
                f.write(base64.b64decode(request.POST.get('photo')))

            user_edit.save()
            return JsonResponse(data={}, status=201)

        new_name = request.POST.get('name')
        new_last_name = request.POST.get('last_name')
        new_email = request.POST.get('email')

        if user_edit.email != new_email:
            user_edit.email = new_email
        if user_edit.first_name != new_name:
            user_edit.first_name = new_name
        if user_edit.last_name != new_last_name:
            user_edit.last_name = new_last_name

        user_edit.save()

        return JsonResponse(data={}, status=201)

def logout_user(request):
    logout(request)
    return redirect('login')




