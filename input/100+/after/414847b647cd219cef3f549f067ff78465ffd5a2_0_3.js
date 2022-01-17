function(resp) {
    trackEvent('Tasks', 'Load');

    tasks = resp.items;

    $('#tasklist .task').remove();
    $('#tutorial').css('display', 'none');

    var task_count = tasks ? tasks.length : 0;
    var incomplete_count = 0;
    for (var i = 0; i < task_count; i++) {
      if (!tasks[i].complete) {
        incomplete_count++;
      }
      $('#tasklist').append(makeTaskLi(tasks[i]));
    }

    if (task_count > 0) {
      if (task_count > 1) {
        $('#tasks-todo').html(incomplete_count + ' things to do');
      } else {
        $('#tasks-todo').html('1 thing to do');
      }
      bindEvents();
    } else {
      $('#tasks-todo').html('no tasks yet. add one above to get started!');
      $('#tutorial').css('display', 'block');
    }

    if (callback) callback();
  }