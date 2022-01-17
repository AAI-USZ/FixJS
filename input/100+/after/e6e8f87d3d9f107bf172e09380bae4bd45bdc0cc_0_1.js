function(e, el) {
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
    while (lvl < (user.get('stats.lvl') - 1)) {
      lvl++;
      expTally += 50 * Math.pow(lvl, 2) - 150 * lvl + 200;
    }
    return model.push('_user.history.exp', {
      date: new Date(),
      value: expTally
    });
  }