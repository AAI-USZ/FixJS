function() {
    var i, tasklist, tasklists, today, _i, _len, _ref, _results;
    today = new Date();
    activeInput = document.querySelectorAll(".task_entry")[today.getDay()];
    activeInput.focus();
    tasklists = document.querySelectorAll(".day");
    _ref = document.querySelectorAll(".day");
    _results = [];
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      tasklist = _ref[i];
      if (!(i < today.getDay())) {
        continue;
      }
      console.log(i);
      _results.push(setDisabled(tasklist));
    }
    return _results;
  }