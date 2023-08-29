import os
import shutil

from django import template
from task.models import *
from datetime import datetime


register = template.Library()


@register.simple_tag
def update_variable(value):
    return value


@register.simple_tag
def count_completed(task: Tasks):
    count = 0
    for i in task:
        if i.is_complete:
            count += 1

    return count


@register.simple_tag
def minus(a, b):
    return a - b


@register.simple_tag
def relation(a, b):
    if b == 0:
        return 0
    return int((a / b) * 100)


@register.simple_tag
def get_default_photo():
    return '/media/user-photo/default.jpg'


@register.simple_tag
def split_file_name(file_name):
    file_name = file_name.split('/', 2)[-1]
    if len(file_name) <= 33:
        return file_name
    else:
        file_name = file_name.rsplit('.', 1)
        return file_name[0][:24] + '...\nРасширение: ' + file_name[1]


@register.simple_tag
def check_date_complete(time_complete, task_id, task_complete):
    if task_complete:
        return 'complete'

    date_now = datetime.today()

    time_complete = map(int, time_complete.split())
    time_complete = datetime(*time_complete)

    if date_now.strftime('%d') == time_complete.strftime('%d'):
        time_to = int(time_complete.strftime('%H')) - int(date_now.strftime('%H'))
        if time_to <= 5:
            return str(time_to) + 'hours before the deadline'
        else:
            return 'The deadline is today'
    elif int(date_now.strftime('%d')) > int(time_complete.strftime('%d')) or\
            int(date_now.strftime('%m')) > int(time_complete.strftime('%m')) or\
            int(date_now.strftime('%Y')) > int(time_complete.strftime('%Y')):

        if (int(date_now.strftime('%d')) - int(time_complete.strftime('%d')) > 1) or\
            int(date_now.strftime('%m')) > int(time_complete.strftime('%m')) or \
                int(date_now.strftime('%Y')) > int(time_complete.strftime('%Y')):

            task = Tasks.objects.get(id=task_id)

            if task.comment:
                if os.path.exists('media/task-comment/' + str(task_id)):
                    shutil.rmtree('media/task-comment/' + str(task_id))

            task.delete()
            return 'del'
        else:
            return 'Failed'
    else:
        return False
