function(callback) {
  var request = gapi.client.tasks.tasks.list({
    'tasklist': task_list,
    'showCompleted': false,
  });
  request.execute(function(resp) {
    trackEvent('Tasks', 'Load');

    tasks = resp.items;

    $('#tasklist .task').remove();
    $('#tutorial').css('display', 'none');

    var task_count = tasks.length;
    var incomplete_count = 0;
    for (var i = 0; i < task_count; i++) {
      if (!tasks[i].complete) {
        incomplete_count++;
      }
      $('#tasklist').append(makeTaskLi(tasks[i]));
    }

    if (task_count > 0) {
      $('#tasks-todo').html(incomplete_count + ' things to do');
        // + ', ' + (task_count - incomplete_count) + ' things done.');
      bindEvents();
    } else {
      $('#tasks-todo').html('no tasks yet. add one above to get started!');
      $('#tutorial').css('display', 'block');
    }

    if (callback) callback();
  });
}