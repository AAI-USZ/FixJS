function(e, el) {
    model.remove('_habitList', 0, 100, function() {
      var task, _k, _len2, _ref3, _results;
      _ref3 = content.tylerDefaultTasks.habits;
      _results = [];
      for (_k = 0, _len2 = _ref3.length; _k < _len2; _k++) {
        task = _ref3[_k];
        _results.push(model.push('_habitList', task));
      }
      return _results;
    });
    model.remove('_dailyList', 0, 100, function() {
      var task, _k, _len2, _ref3, _results;
      _ref3 = content.tylerDefaultTasks.dailys;
      _results = [];
      for (_k = 0, _len2 = _ref3.length; _k < _len2; _k++) {
        task = _ref3[_k];
        _results.push(model.push('_dailyList', task));
      }
      return _results;
    });
    model.remove('_todoList', 0, 100, function() {
      var task, _k, _len2, _ref3, _results;
      _ref3 = content.tylerDefaultTasks.todos;
      _results = [];
      for (_k = 0, _len2 = _ref3.length; _k < _len2; _k++) {
        task = _ref3[_k];
        _results.push(model.push('_todoList', task));
      }
      return _results;
    });
    return model.remove('_rewardList', 0, 100, function() {
      var task, _k, _len2, _ref3, _results;
      _ref3 = content.tylerDefaultTasks.rewards;
      _results = [];
      for (_k = 0, _len2 = _ref3.length; _k < _len2; _k++) {
        task = _ref3[_k];
        _results.push(model.push('_rewardList', task));
      }
      return _results;
    });
  }