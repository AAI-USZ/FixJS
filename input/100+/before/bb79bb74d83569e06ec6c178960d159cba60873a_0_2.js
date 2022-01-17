function(e) {
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
    if (date != 'date') {
      var date_parts = date.split('-');
      new_task.due = (
        date_parts[2] + '-' + date_parts[0] + '-' + date_parts[1] + 'T00:00:00.000Z');
    }

    startLoad();
    var check_span = '<span class="check">&nbsp;</span>';
    var item = '<a class="title">' + title + '</a>';

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
  }