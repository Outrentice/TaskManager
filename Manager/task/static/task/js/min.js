$('.mail-choice').change(function() {
    if($(this).is(":checked")) {
        $(this).parent().addClass('selected-bg');

        var id_check = $(this).attr('id')
        if (id_check.indexOf('detail') >= 0) {
            id_aj = id_check.replace('detail', '')
            id_task = id_check.replace('detail', '#task')

            id_check = id_check.replace('detail', '#mail')
            $(id_check).parent().addClass('selected-bg');
            $(id_check).prop('checked', true);
        }
        else {
            id_aj = id_check.replace('mail', '')
            id_task = id_check.replace('mail', '#task')

            id_check = id_check.replace('mail', '#detail')
            $(id_check).parent().addClass('selected-bg');
            $(id_check).prop('checked', true);
        }

        $(id_task).find('.msg-date').css('color', '');

        $.ajax({
            type: "POST",
            data: {'action': 'add', 'id': id_aj}, // получаяем данные формы
            headers: {'X-CSRFToken': getCookie('csrftoken')},
            url: "update-complete",
            success: function (response) {
                var all_completed = $('#all-completed')
                all_completed.text(Number(all_completed.text()) + 1)

                var completed_tasks = $('#completed-tasks')
                completed_tasks.text(Number(completed_tasks.text()) + 1)

                var to_do_tasks = $('#to-do-tasks')
                to_do_tasks.text(Number(to_do_tasks.text()) - 1)

                var progress_status = $('.progress-status')
                var status = progress_status.text().split('/')
                progress_status.text(Number(status[0]) + 1 + '/' + status[1])
            },
        });

  } else {
    $(this).parent().removeClass('selected-bg');

    var id_check = $(this).attr('id')
        if (id_check.indexOf('detail') >= 0) {
            id_aj = id_check.replace('detail', '')
            id_task = id_check.replace('detail', '#task')

            id_check = id_check.replace('detail', '#mail')
            $(id_check).parent().removeClass('selected-bg');
            $(id_check).prop('checked', false);
        }
        else {
            id_aj = id_check.replace('mail', '')
            id_task = id_check.replace('mail', '#task')

            id_check = id_check.replace('mail', '#detail')
            $(id_check).parent().removeClass('selected-bg');
            $(id_check).prop('checked', false);
        }

        this_date_complete = $(id_task).find('.msg-date');

        date_now = new Date()
        var day_now = Number(date_now.getDate())
        time_deadline = this_date_complete.text().split(', ')
        var day_deadline = Number(time_deadline[1].split(' ')[0])

        if (day_now === day_deadline) {
            this_date_complete.css('color', 'rgba(227, 209, 93, 1)')
        }
        else if (day_now > day_deadline) {
            this_date_complete.css('color', 'rgba(233, 11, 11, 0.8)')
        }

        $.ajax({
            type: "POST",
            data: {'action': 'reduce', 'id': id_aj}, // получаяем данные формы
            headers: {'X-CSRFToken': getCookie('csrftoken')},
            url: "update-complete",
            success: function (response) {
                var all_completed = $('#all-completed')
                all_completed.text(Number(all_completed.text()) - 1)

                var completed_tasks = $('#completed-tasks')
                completed_tasks.text(Number(completed_tasks.text()) - 1)

                var to_do_tasks = $('#to-do-tasks')
                to_do_tasks.text(Number(to_do_tasks.text()) + 1)

                var progress_status = $('.progress-status')
                var status = progress_status.text().split('/')
                progress_status.text(Number(status[0]) - 1 + '/' + status[1])
            },
        });
  }
});

const colorInput = document.getElementById("colorpicker");

colorInput.addEventListener("input", (e) => {
 document.body.style.setProperty("--button-color", e.target.value);
});

$('.inbox-calendar').click(function(){
    $('.calendar-container').toggleClass('calendar-show');
    $('.inbox-container').toggleClass('hide');
    $('.mail-detail').toggleClass('hide');
});
