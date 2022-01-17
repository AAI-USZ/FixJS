function(model) {
  var endOfDayTally, expModifier, hpModifier, poormanscron, setupSortable, step, tour, type, updateStats, _i, _j, _len, _len1, _ref1, _ref2;
  model.set('_purl', window.location.href + model.get('_user.id'));
  $('[rel=popover]').popover();
  model.on('set', '*', function() {
    return $('[rel=popover]').popover();
  });
  model.set('_hideCompleted', true);
  $('a[data-toggle="tab"]').on('shown', function(e) {
    var hideCompleted;
    hideCompleted = $(e.target).attr('href') === '#tab1' ? true : false;
    return model.set('_hideCompleted', hideCompleted);
  });
  setupSortable = function(type) {
    return $("ul." + type + "s").sortable({
      dropOnEmpty: false,
      cursor: "move",
      items: "li",
      opacity: 0.4,
      scroll: true,
      axis: 'y',
      update: function(e, ui) {
        var domId, id, item, to;
        item = ui.item[0];
        domId = item.id;
        id = item.getAttribute('data-id');
        to = $("ul." + type + "s").children().index(item);
        return model.at("_" + type + "List").pass({
          ignore: domId
        }).move({
          id: id
        }, to);
      }
    });
  };
  _ref1 = ['habit', 'daily', 'todo', 'reward'];
  for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
    type = _ref1[_i];
    setupSortable(type);
  }
  tour = new Tour();
  _ref2 = content.tourSteps;
  for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
    step = _ref2[_j];
    tour.addStep({
      element: step.element,
      title: step.title,
      content: step.content,
      placement: step.placement
    });
  }
  tour.start();
  exports.loadDebugDefaults = function(e, el) {
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
  };
  exports.addTask = function(e, el, next) {
    var list, newModel, text;
    type = $(el).attr('data-task-type');
    list = model.at("_" + type + "List");
    newModel = model.at('_new' + type.charAt(0).toUpperCase() + type.slice(1));
    if (!(text = view.escapeHtml(newModel.get()))) {
      return;
    }
    newModel.set('');
    switch (type) {
      case 'habit':
        return list.push({
          type: type,
          text: text,
          notes: '',
          value: 0,
          up: true,
          down: true
        });
      case 'reward':
        return list.push({
          type: type,
          text: text,
          notes: '',
          value: 20
        });
      case 'daily':
      case 'todo':
        return list.push({
          type: type,
          text: text,
          notes: '',
          value: 0,
          completed: false
        });
    }
  };
  exports.del = function(e, el) {
    var task;
    task = model.at(e.target);
    model.del('_user.tasks.' + task.get('id'));
    return task.remove();
  };
  exports.toggleTaskEdit = function(e, el) {
    var task;
    task = model.at($(el).parents('li')[0]);
    $('#\\' + task.get('id') + '-chart').hide();
    return $('#\\' + task.get('id') + '-edit').toggle();
  };
  exports.toggleChart = function(e, el) {
    var chart, chartSelector, data, date, hideSelector, historyPath, matrix, obj, options, readableDate, _k, _len2, _ref3;
    hideSelector = $(el).attr('data-hide-selector');
    chartSelector = $(el).attr('data-chart-selector');
    historyPath = $(el).attr('data-history-path');
    $(document.getElementById(hideSelector)).hide();
    $(document.getElementById(chartSelector)).toggle();
    matrix = [['Date', 'Score']];
    _ref3 = model.get(historyPath);
    for (_k = 0, _len2 = _ref3.length; _k < _len2; _k++) {
      obj = _ref3[_k];
      date = new Date(obj.date);
      readableDate = date.toISOString();
      matrix.push([readableDate, obj.value]);
    }
    data = google.visualization.arrayToDataTable(matrix);
    options = {
      title: 'History',
      backgroundColor: 'whiteSmoke'
    };
    chart = new google.visualization.LineChart(document.getElementById(chartSelector));
    return chart.draw(data, options);
  };
  exports.buyItem = function(e, el, next) {
    var hp, index, money, task, taskId, user, value, _ref3, _results;
    user = model.at('_user');
    money = user.get('stats.money');
    _ref3 = [$(el).attr('data-type'), $(el).attr('data-value'), $(el).attr('data-index')], type = _ref3[0], value = _ref3[1], index = _ref3[2];
    if (money < value) {
      return;
    }
    user.set('stats.money', money - value);
    if (type === 'armor') {
      user.set('items.armor', index);
      return model.set('_items.armor', content.items.armor[parseInt(index) + 1]);
    } else if (type === 'weapon') {
      user.set('items.weapon', index);
      return model.set('_items.weapon', content.items.weapon[parseInt(index) + 1]);
    } else if (type === 'potion') {
      hp = user.get('stats.hp');
      hp += 15;
      if (hp > 50) {
        hp = 50;
      }
      return user.set('stats.hp', hp);
    } else if (type === 'reroll') {
      _results = [];
      for (taskId in user.get('tasks')) {
        task = model.at('_user.tasks.' + taskId);
        if (task.get('type') !== 'reward') {
          _results.push(task.set('value', 0));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    }
  };
  exports.updateStats = updateStats = function(user, stats) {
    var money, tnl;
    if (stats.hp != null) {
      if (stats.hp < 0) {
        user.set('stats.lvl', 0);
      } else {
        user.set('stats.hp', stats.hp);
      }
    }
    if (stats.exp != null) {
      tnl = model.get('_tnl');
      if (stats.exp >= tnl) {
        stats.exp -= tnl;
        user.set('stats.lvl', user.get('stats.lvl') + 1);
      }
      if (!user.get('items.itemsEnabled') && stats.exp >= 50) {
        user.set('items.itemsEnabled', true);
        $('ul.items').popover({
          title: content.items.unlockedMessage.title,
          placement: 'left',
          trigger: 'manual',
          html: true,
          content: "<div class='item-store-popover'>            <img src='/img/BrowserQuest/chest.png' />            " + content.items.unlockedMessage.content + " <a href='#' onClick=\"$('ul.items').popover('hide');return false;\">[Close]</a>            </div>"
        });
        $('ul.items').popover('show');
      }
      user.set('stats.exp', stats.exp);
    }
    if (stats.money != null) {
      if (!(typeof money !== "undefined" && money !== null) || money < 0) {
        money = 0.0;
      }
      return user.set('stats.money', stats.money);
    }
  };
  expModifier = function(value) {
    var dmg, modified, user;
    user = model.at('_user');
    dmg = user.get('items.weapon') * .03;
    dmg += user.get('stats.lvl') * .03;
    modified = value + (value * dmg);
    console.log(modified, 'exp modified');
    return modified;
  };
  hpModifier = function(value) {
    var ac, modified, user;
    user = model.at('_user');
    ac = user.get('items.armor') * .03;
    ac += user.get('stats.lvl') * .03;
    modified = value - (value * ac);
    console.log(modified, 'hp modified');
    return modified;
  };
  exports.vote = function(e, el, next) {
    var adjustvalue, completed, delta, direction, exp, hp, lvl, money, sign, task, user, value, _ref3;
    direction = $(el).attr('data-direction');
    if (direction === 'true/') {
      direction = 'up';
    }
    if (direction === 'false/') {
      direction = 'down';
    }
    task = model.at($(el).parents('li')[0]);
    user = model.at('_user');
    sign = direction === "up" ? 1 : -1;
    value = task.get('value');
    delta = 0;
    if (value < 0) {
      delta = (-0.1 * value + 1) * sign;
    } else {
      delta = (Math.pow(0.9, value)) * sign;
    }
    adjustvalue = task.get('type') !== 'reward';
    if ((task.get('type') === 'habit') && (task.get("up") === false || task.get("down") === false)) {
      adjustvalue = false;
    }
    if (adjustvalue) {
      value += delta;
    }
    completed = task.get("completed");
    if (task.get('type') !== 'habit') {
      if (direction === "up") {
        completed = true;
      }
      if (direction === "down") {
        completed = false;
      }
    } else {
      if (task.get('value') !== value) {
        task.push('history', {
          date: new Date(),
          value: value
        });
      }
    }
    task.set('value', value);
    task.set('completed', completed);
    _ref3 = [user.get('stats.money'), user.get('stats.hp'), user.get('stats.exp'), user.get('stats.lvl')], money = _ref3[0], hp = _ref3[1], exp = _ref3[2], lvl = _ref3[3];
    if (task.get('type') === 'reward') {
      money -= task.get('value');
      if (money < 0) {
        hp += money;
        money = 0;
      }
    }
    if (delta > 0 || (task.get('type') === 'daily' || task.get('type') === 'todo')) {
      exp += expModifier(delta);
      money += delta;
    } else if (task.get('type') !== 'reward') {
      hp += hpModifier(delta);
    }
    return updateStats(user, {
      hp: hp,
      exp: exp,
      money: money
    });
  };
  exports.endOfDayTally = endOfDayTally = function(e, el) {
    var absVal, completed, expTally, hp, key, lvl, task, todoTally, user, value, _ref3;
    user = model.at('_user');
    todoTally = 0;
    for (key in model.get('_user.tasks')) {
      task = model.at("_user.tasks." + key);
      _ref3 = [task.get('type'), task.get('value'), task.get('completed')], type = _ref3[0], value = _ref3[1], completed = _ref3[2];
      if (type === 'todo' || type === 'daily') {
        if (!completed) {
          value += value < 0 ? (-0.1 * value + 1) * -1 : (Math.pow(0.9, value)) * -1;
          task.set('value', value);
          if (type === 'daily') {
            hp = user.get('stats.hp') + hpModifier(value);
            updateStats(user, {
              hp: hp
            });
          }
        }
        if (type === 'daily') {
          task.push("history", {
            date: new Date(),
            value: value
          });
        } else {
          absVal = completed ? Math.abs(value) : value;
          todoTally += absVal;
        }
        if (type === 'daily') {
          task.set('completed', false);
        }
      }
    }
    model.push('_user.history.todos', {
      date: new Date(),
      value: todoTally
    });
    expTally = user.get('stats.exp');
    lvl = 0;
    _(user.get('stats.lvl') - 1).times(function() {
      lvl++;
      return expTally += 50 * Math.pow(lvl, 2) - 150 * lvl + 200;
    });
    return model.push('_user.history.exp', {
      date: new Date(),
      value: expTally
    });
  };
  exports.poormanscron = poormanscron = function() {
    var DAY, daysPassed, lastCron, today;
    model.setNull('_user.lastCron', new Date());
    lastCron = new Date(new Date(model.get('_user.lastCron')).toDateString());
    today = new Date(new Date().toDateString());
    DAY = 1000 * 60 * 60 * 24;
    daysPassed = Math.floor((today.getTime() - lastCron.getTime()) / DAY);
    if (daysPassed > 0) {
      _(daysPassed).times(function() {
        return endOfDayTally();
      });
      return model.set('_user.lastCron', today);
    }
  };
  poormanscron();
  setInterval((function() {
    return poormanscron();
  }), 3600000);
  exports.toggleDebug = function() {
    return model.set('_debug', !model.get('_debug'));
  };
  exports.revive = function(e, el) {
    var stats;
    stats = model.at('_user.stats');
    stats.set('hp', 50);
    stats.set('lvl', 1);
    stats.set('exp', 0);
    stats.set('money', 0);
    model.set('_user.items.armor', 0);
    model.set('_user.items.weapon', 0);
    model.set('_items.armor', content.items.armor[1]);
    return model.set('_items.weapon', content.items.weapon[1]);
  };
  exports.shortcuts = function(e) {
    var code, command;
    if (!(e.metaKey || e.ctrlKey)) {
      return;
    }
    code = e.which;
    if (!(command = ((function() {
      switch (code) {
        case 66:
          return 'bold';
        case 73:
          return 'italic';
        case 32:
          return 'removeFormat';
        case 220:
          return 'removeFormat';
        default:
          return null;
      }
    })()))) {
      return;
    }
    document.execCommand(command, false, null);
    if (e.preventDefault) {
      e.preventDefault();
    }
    return false;
  };
  document.execCommand('useCSS', false, true);
  return document.execCommand('styleWithCSS', false, false);
}