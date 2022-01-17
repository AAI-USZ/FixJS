function () {
      var json = webPage.evaluate(function () {
        var tasks = [];
        $('.task-list > .task').each(function () {
          var el = $(this), task = {};
          task.text = el.find('.txt').first().text();
          task.done = el.find('.chk').first().prop('checked');
          tasks.push(task);
        });
        return JSON.stringify(tasks);
      });
      return JSON.parse(json);
    }