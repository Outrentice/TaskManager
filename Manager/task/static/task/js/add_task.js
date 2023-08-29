function add_task_button(event, img_src) {
    var date_now = new Date()
    var date_now = date_now.getDate() + ' ' + date_now.toLocaleString('en-us', { month: 'short' }) + ', ' + date_now.getFullYear()

    if (!document.getElementById('create-task')) {
        $('.inbox').append('<div class="msg selected-bg anim-y" id="create-task">' +
              '<input type="checkbox" name="msg" id="mail0" class="mail-choice" checked>' +
              '<label for="mail0"></label>' +
              '<div class="msg-content">' +
               '<div class="msg-title"></div>' +
               '<div class="msg-date">' + date_now + '</div>' +
              '</div>' +
              '<img src="' + img_src + '" alt="" class="members mail-members">' +
             '</div>')
    }
    else{
        $('#add-task-form').fadeTo('fast', 0.5).fadeTo('fast', 1.0);
    }

    var mail_contents_div = document.getElementsByClassName('mail-contents')
    mail_contents_div[0].classList.add('hide')
    mail_contents_div[1].classList.remove('hide')

    document.getElementsByClassName('mail-textarea')[0].classList.add('hide')


    document.getElementsByClassName('add-task-form-bottom')[0].classList.remove('hide')


    if (event.target.className.indexOf('button-task') >= 0) {
        $('.inbox-calendar-checkbox').prop('checked', false)
        $('.calendar-container').toggleClass('calendar-show');
        $('.inbox-container').toggleClass('hide');
        $('.mail-detail').toggleClass('hide');
    }

    var add_task_form_div = document.getElementsByClassName('add-task-form')
    if (add_task_form_div.length > 3) {
        document.getElementById('mail-title').className = 'mail-contents-title'
        document.getElementById('mail-time').className = 'mail-time'
        document.getElementById('mail-desc').className = 'mail-inside'

        document.getElementById('error-edit').remove()
        document.getElementById('edit-task-bottom').classList.add('hide')
        $('.mail-doc').remove();
    }




//    var title_task = document.getElementsByClassName('mail-contents-title')[0]
//    title_task.className = 'add-task-form'
//    title_task.innerHTML = '<input type="text" oninput="ChangeTitle(this)" name="title" placeholder="title" />'
//
//    var date_complete = document.getElementsByClassName('mail-time')[0]
//    date_complete.className = 'add-task-form'
//    date_complete.innerHTML = '<input type="datetime-local" placeholder="date" />'
//
//    var description = document.getElementsByClassName('mail-inside')[0]
//    description.className = 'add-task-form'
//    description.innerHTML = '<textarea placeholder="description"></textarea>'
//
//    var task_detail = document.getElementsByClassName('mail-textarea')[0]
//    task_detail.className = 'add-task-form-bottom'
//    task_detail.innerHTML = '<button class="add-button">Confirm</button>'




}

//var button = document.getElementsByClassName('add-button')[1]
//var add_button_calendar = document.getElementsByClassName('button-task')[0]
//
//button.addEventListener('click', add_task_button)
//add_button_calendar.addEventListener('click', add_task_button)

function progress_bar(с) {
    console.log(c)
    document.body.style.setProperty("--progress-status", c);
}


function ChangeTitle(el){
    var div_create_task = document.getElementById('create-task')
    var title = div_create_task.getElementsByClassName('msg-title')[0]
    title.innerHTML = el.value
}

function search_input (el) {
    var tasks = document.getElementsByClassName('msg')

    for (var i=1; i < tasks.length; i++) {
        task = tasks[i].getElementsByClassName('msg-title')[0].innerHTML

        if (task.toLowerCase().indexOf(el.value.toLowerCase()) == -1 && tasks[i].id != 'create-task') {
            tasks[i].classList.add('hide')
        }
        else {
            tasks[i].classList.remove('hide')
        }
    }
}

function ViewTask(comments, task_title, task_desc, task_time, task_id){
    var mail_contents_div = document.getElementsByClassName('mail-contents')
    var add_task_form_div = document.getElementsByClassName('add-task-form')

    if (!mail_contents_div[1].classList.contains("hide")) {
        var mail_textarea_div = document.getElementsByClassName('mail-textarea')
        var confirm_div = document.getElementsByClassName('add-task-form-bottom')[0]

        mail_contents_div[1].classList.add('hide')
        mail_contents_div[0].classList.remove('hide')

        mail_textarea_div[0].classList.remove('hide')
        confirm_div.classList.add('hide')

        document.getElementById('create-task').remove()
    }
    else if (add_task_form_div.length > 3) {
        document.getElementById('mail-title').className = 'mail-contents-title'
        document.getElementById('mail-time').className = 'mail-time'
        document.getElementById('mail-desc').className = 'mail-inside'

        document.getElementById('error-edit').remove()
        document.getElementsByClassName('mail-textarea')[0].classList.remove('hide')
        document.getElementById('edit-task-bottom').classList.add('hide')
    }

    var task_detail_title = document.getElementsByClassName('mail-contents-title')[0]
    task_detail_title.innerHTML = task_title

    var task_detail_time = document.getElementsByClassName('mail-time')[0]
    task_detail_time.textContent = task_time

    var task_detail_description = document.getElementsByClassName('mail-inside')[0]
    task_detail_description.innerHTML = task_desc

    var checkbox_task_list = document.getElementById('mail' + task_id)
    var mail_checkbox_complete = document.querySelector(".mail-contents-subject input")
    mail_checkbox_complete.checked = checkbox_task_list.checked
    mail_checkbox_complete.id = 'detail' + task_id
    var label_checkbox_complete = document.querySelector(".mail-contents-subject label")
    label_checkbox_complete.htmlFor  = 'detail' + task_id

    $('.mail-doc').remove();
    if (comments != ' ') {
        for (var i=comments.length - 1; i>=0; i--){
            var mail_inside_div = document.querySelector(".mail-inside")
            ele = document.createElement("div")
            ele.className = "mail-doc"

            if (i > 0) {
                ele.style.borderTop = 'none'
            }

            inHTML = '<div class="mail-doc-detail">' +
                                '<div class="mail-doc-name" id="mail-comment' + i + '">' + comments[i].text + '</div>' +
                                '<div class="mail-doc-date">added ' + comments[i].day + ' ' + comments[i].month + ', ' +  comments[i].year +  ' ' +  comments[i].time + '</div>' +
                             '</div>'


            if (comments[i].file) {
                file_name = comments[i].file.split('/', 3)
                file_name = file_name[file_name.length - 1]
                if (file_name.length > 33) {
                    file_name = file_name.split('').reverse().join('').split('.', 2)
                    file_name = file_name[1].split('').reverse().join('').slice(0, 24) + '...\nРасширение: ' + file_name[0].split('').reverse().join('')
                }

                inHTML = '<div class="mail-doc-file">' +
                            '<div class="mail-doc-wrapper">' +
                                '<a href="/media/' + comments[i].file + '" name="comment-file" download>' +
                                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text">' +
                                 '<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />' +
                                 '<path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" /></svg>' +
                                '</a>' +
                                '<div class="mail-doc-file-name">' + file_name + '</div>' +
                                '</div>' +
                                inHTML +
                                '</div>'

            }

            ele.innerHTML = inHTML +
                            '<div class="mail-doc-icons">' +
                                '<svg xmlns="http://www.w3.org/2000/svg" onclick="trash_comment(' + i + ')" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2">' +
                                '<path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" /></svg>' +
                            '</div>'

            mail_inside_div.parentNode.insertBefore(ele, mail_inside_div.nextSibling);
        }
    }
}

$('#file-loader-comment').change(function() {
    if (($(this).prop('files')[0].size / 1000000) <= 10) {
        if (!$('.input-file-list-item').length) {
            $('.attach').before('<div class="input-file-list-item" onclick="DeleteFileComment(this)">' +
                                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" class="feather feather-add-comment-file" onmouseover="MouseOverSvgAddFile(this)" onmouseout="MouseOutCloseSvgFile(this)">' +
                                '<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"></path>' +
                                '<path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"></path></svg>' +
                            '</div>')
        }
    }
    else {
        document.getElementById('file-loader-comment').value= null;
    }

});

function MouseOverSvgAddFile(el) {
    el.innerHTML = '<path d="M15 9.00004L9 15M15 15L9 9.00004M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
}

function MouseOutCloseSvgFile(el) {
    el.innerHTML = '<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"></path>' +
                   '<path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"></path></svg>'
}

function DeleteFileComment(el) {
    document.getElementById('file-loader-comment').value= null;
    el.remove();
}

function AddCommentAjax(data) {
    $.ajax({
        type: "POST",
        data: data, // получаяем данные формы
        headers: {'X-CSRFToken': getCookie('csrftoken')},
        url: "add-comment",
        success: function (response) {
            location.reload();
        },
        error: function (response) {
            console.log('False')
        }
    });
}

function AddComment() {
    text_comment = document.querySelector(".mail-textarea input").value

    if (text_comment.trim()) {
        var data = {}
        data['id'] = document.querySelector(".mail-contents-subject input").id.replace('detail', '')
        data['text'] = text_comment

        var date_now = new Date()
        data['date'] = {'time': date_now.toLocaleString("ru-RU", { hour: '2-digit' }) + ':' + date_now.toLocaleString("ru-RU", { minute: '2-digit' }),
                        'day': date_now.getDate(),
                        'month': date_now.toLocaleString('en-us', { month: 'short' }),
                        'year': date_now.getFullYear()}

        if ($('#file-loader-comment').prop('files')[0]) {
            console.log($('#file-loader-comment').prop('files')[0])
            var reader = new FileReader();
            reader.readAsDataURL($('#file-loader-comment').prop('files')[0]);

            reader.onload = function () {
                let result = reader.result.split('base64,')

                data['file'] = result[1]
                data['file_name'] = $('#file-loader-comment').prop('files')[0].name

                AddCommentAjax(data)
            }
        }
        else {
            AddCommentAjax(data)
        }
    }
    else {
        document.querySelector(".mail-textarea input").value = ''
    }
}

//$('#file-loader-comment').change(function(ev) {
//
//    var reader = new FileReader();
//    reader.readAsDataURL($(this).prop('files')[0]);
//
//    reader.onload = function () {
//        let result = reader.result.split('base64,')
//
//        file_extension = result[0].split('/')[1].replace(';', '')
//        to_image = result[1]
//
//        $.ajax({
//            type: 'POST',
//            data: {'id': user_id, 'file': to_image, 'file_extension': file_extension},
//            headers: {'X-CSRFToken': getCookie('csrftoken')},
//            url: 'add-comment',
//            success: function (response) {
//                location.reload();
//            },
//        });
//    }
//
//});

var button_trash = document.getElementsByClassName('feather-trash-2')[0]

button_trash.addEventListener('click', (event) => {
    console.log(event)

    var id_task = document.querySelector(".mail-contents-subject input").id.replace('detail', '')

    $.ajax({
        type: "POST",
        data: {'id': id_task}, // получаяем данные формы
        headers: {'X-CSRFToken': getCookie('csrftoken')},
        url: "delete-task",
        success: function (response) {
            location.reload();
        },
        error: function (response) {
            console.log('False')
        }
    });

})

function trash_comment(id_comment) {
    var id_task = document.querySelector(".mail-contents-subject input").id.replace('detail', '')

    $.ajax({
        type: "POST",
        data: {'id': id_task, 'id_comment': id_comment}, // получаяем данные формы
        headers: {'X-CSRFToken': getCookie('csrftoken')},
        url: "delete-task",
        success: function (response) {
            location.reload();
        },
    });
}


var button_edit = document.getElementsByClassName('feather-tag')[0]

button_edit.addEventListener('click', (event) => {
    var mail_contents_div = document.getElementsByClassName('mail-contents')

    if (!mail_contents_div[1].classList.contains('hide')){
        mail_contents_div[0].classList.remove('hide')
        mail_contents_div[1].classList.add('hide')

        document.getElementsByClassName('mail-textarea')[0].classList.remove('hide')
        document.getElementsByClassName('add-task-form-bottom')[0].classList.add('hide')
        document.getElementById('create-task').remove()
    }

    var title_task = document.getElementsByClassName('mail-contents-title')[0]
    title_task.className = 'add-task-form'
    title_value = title_task.textContent.trim() != 'Title' ? title_task.textContent : '';
    title_task.innerHTML = '<label for="edit-title">Title</label> <input type="text" name="title" placeholder="title" id="edit-title" />'

    var date_complete = document.getElementsByClassName('mail-time')[0]
    date_complete.className = 'add-task-form'
    date_complete.innerHTML = '<label for="edit-date">Time complete</label> <input type="datetime-local" placeholder="date" id="edit-date" />'

    var description = document.getElementsByClassName('mail-inside')[0]
    description.className = 'add-task-form'
    description_value = description.textContent.trim() != 'Description' ? description.textContent : '';
    description.innerHTML = '<label for="edit-desc">Description</label> <textarea placeholder="description" id="edit-desc" style="margin-bottom: 30px;"></textarea>'

    var comments = $('.mail-doc-name');
    $('.mail-doc-icons').remove();
    for (var i=0; i<comments.length; i++) {
        comment_value = comments[i].innerHTML

        comments[i].className = 'add-task-form'
        comments[i].innerHTML = '<label for="edit-comment' + i + '">Comment</label> <textarea placeholder="comment" id="edit-comment' + i + '" style="color: var(--body-color); font-weight: 600;"></textarea>'

//        var file_comment = $(comments[i]).parent().parent().children('[name="comment-file"]')[0]
//        if (file_comment)
//        {
//            file_comment.remove();
//            $(comments[i]).parent().parent().prepend('<input type="file" class="edit-loader-com" id="edit-file-com' + i +'"> <label for="file-loader-comment' + i +'"></label>')
//
//            console.log('Найдено')
//            console.log(file_comment)
//        }

        document.getElementById('edit-comment' + i).value = comment_value
    }

    $('.mail-contents').append('<div class="error-edit hide" id="error-edit"></div>')


    var title_input = document.getElementById('edit-title')
    title_input.value = title_value
    title_input.focus()
    document.getElementById('edit-desc').value = description_value

    document.getElementsByClassName('mail-textarea')[0].classList.add('hide')
    document.getElementById('edit-task-bottom').classList.remove('hide')
})

function press_edit_button(el) {
    var id_task = document.querySelector(".mail-contents-subject input").id.replace('detail', '')

    var title_task = document.getElementById('edit-title').value
    var date_complete = document.getElementById('edit-date').value
    var description = document.getElementById('edit-desc').value

    var comments_text = {}
    var comments = document.querySelectorAll(".mail-doc-detail textarea")
    for (var i=0; i<comments.length; i++) {
        comments_text[i] = (comments[i].value)
    }


    $.ajax({
        type: "POST",
        data: {'id': id_task, 'title': title_task, 'date': date_complete, 'description': description, 'comments_text': comments_text}, // получаяем данные формы
        headers: {'X-CSRFToken': getCookie('csrftoken')},
        url: "edit-task",
        success: function (response) {
            location.reload();
        },
        error: function (response) {
            $('#error-edit').removeClass('hide')
            $('#error-edit').text(response.responseJSON.error)
        }
    });
}

var settings_button = document.getElementById('settings-button')

settings_button.addEventListener('click', (event) => {
    $('.user-settings').toggleClass('hide');
    $('#task-progress').toggleClass('hide');
})

var profile_button = document.getElementById('profile-button')

profile_button.addEventListener('click', (event) => {
    $('.user-settings').addClass('hide');
    $('#task-progress').removeClass('hide');
})

function edit_settings(user_id) {
    var new_email = document.getElementById('email-settings').value
    var new_name = document.getElementById('name-settings').value
    var new_lastname = document.getElementById('lastname-settings').value
    console.log(new_name, new_lastname)

    $.ajax({
        type: 'POST',
        data: {'id': user_id, 'name': new_name, 'last_name':new_lastname, 'email': new_email},
        headers: {'X-CSRFToken': getCookie('csrftoken')},
        url: 'edit-settings',
        success: function (response) {
            location.reload();
        },
    });

}

$('#user-photo-input').change(function(ev) {
    if (($(this).prop('files')[0].size / 1000000) <= 3) {
        user_id = $(this).attr('name').replace('user-photo', '')

        var reader = new FileReader();
        reader.readAsDataURL($(this).prop('files')[0]);

        reader.onload = function () {
            let result = reader.result.split('base64,')[1]

            $.ajax({
                type: 'POST',
                data: {'id': user_id, 'photo': result},
                headers: {'X-CSRFToken': getCookie('csrftoken')},
                url: 'edit-settings',
                success: function (response) {
                    location.reload();
                },
            });
        }
    }
});


function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
}
