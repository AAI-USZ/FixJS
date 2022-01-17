function () {
  $('#undo').hide();
  $('#addlist').hide();
  $('#adddate').calender();

  $('#complete').click(function(e) {
    if ($('#complete').attr('checked')) {
      $('.complete').css('display', 'list-item');
    } else {
      $('.complete').css('display', 'none');
    }
  });

  $('#incomplete').click(function(e) {
    if ($('#incomplete').attr('checked')) {
      $('.incomplete').css('display', 'list-item');
    } else {
      $('.incomplete').css('display', 'none');
    }
  });

  $('#undo').click(function(e) {
    if (last_checked) {
      startLoad();
      last_checked_id = last_checked;

      gapi.client.tasks.tasks.get({
        'tasklist': task_list,
        'task': last_checked_id,
      }).execute(function(resp) {
        undo_task = resp.result;
        delete undo_task.completed;
        undo_task.status = 'needsAction';

        gapi.client.tasks.tasks.update({
          'tasklist': task_list,
          'task': last_checked_id,
          'resource': undo_task,
        }).execute(function(inner_resp) {
          trackEvent('Task', 'Undo');
          getTasks(endLoad);
        });
      });
    }

    last_checked = undefined
    $('#undo').hide()
  })

  $('#addtask').focus(function(e) {
    if (!task_field_init) {
      $('#addtask').val('').css('color', '#000');
      task_field_init = true;
    }
  })

  $('#adddate').focus(function(e) {
    if (!date_field_init) {
      $('#adddate').val('').css('color', '#000');
      date_field_init = true;
    }
  })

  $('#addform').submit(function(e) {
    e.preventDefault();
    e.stopPropagation();

    var new_task = {}
    var title = $('#addtask').val();
    if (!title) {
      $('#addtask').focus();
      return;
    } else {
      new_task.title = title;
    }

    var date = $('#adddate').val();
    if (date != 'date' && date != '') {
      var date_parts = date.split('-');
      new_task.due = (
        date_parts[2] + '-' + date_parts[0] + '-' + date_parts[1] + 'T00:00:00.000Z');
    }

    startLoad();
    gapi.client.tasks.tasks.insert({
      'tasklist': task_list,
      'resource': new_task,
    }).execute(function(result) {
      trackEvent('Task', 'Add');
      getTasks(function() {
        $('#addtask').val('');
        $('#adddate').val('');
        endLoad();
      });
    });
  });

  $('#tasks-lists').change(function(e) {
    trackEvent('Tasklist', 'Change');
    task_list = $('#tasks-lists').val();
    getTasks();
  });

  $('#addlist').click(function(e) {
    var name = prompt('Name for new task list:');
    if (name) {
      startLoad();
      var tasklist = {
        'resource': { 'title': name },
      }
      gapi.client.tasks.tasklists.insert(tasklist).execute(function (res) {
        trackEvent('Tasklist', 'Add');
        getLists(endLoad);
      });
    }
  });
}