function(err, users) {
    var debuggingUsers, guid, newUser, task, user, _i, _len, _ref1;
    debuggingUsers = parseInt(userId) < 40;
    if ((userId != null) && (users.get(userId) || debuggingUsers)) {
      model.set('_userId', userId);
    }
    userId = model.get('_userId');
    if (!model.get("users." + userId)) {
      newUser = {
        stats: {
          money: 0,
          exp: 0,
          lvl: 1,
          hp: 50
        },
        items: {
          itemsEnabled: false,
          armor: 0,
          weapon: 0
        },
        tasks: {},
        habitIds: [],
        dailyIds: [],
        todoIds: [],
        rewardIds: []
      };
      _ref1 = content.defaultTasks;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        task = _ref1[_i];
        guid = Guid.raw();
        task.id = guid;
        newUser.tasks[guid] = task;
        switch (task.type) {
          case 'habit':
            newUser.habitIds.push(guid);
            break;
          case 'daily':
            newUser.dailyIds.push(guid);
            break;
          case 'todo':
            newUser.todoIds.push(guid);
            break;
          case 'reward':
            newUser.rewardIds.push(guid);
        }
      }
      users.set(userId, newUser, function(err, path, value) {
        return debug({
          err: err,
          path: path,
          value: value
        }, 'new user');
      });
    }
    user = model.at("users." + userId);
    model.ref('_user', user);
    model.set('_items', {
      armor: content.items.armor[parseInt(user.get('items.armor')) + 1],
      weapon: content.items.weapon[parseInt(user.get('items.weapon')) + 1],
      potion: content.items.potion,
      reroll: content.items.reroll
    });
    model.fn('_tnl', '_user.stats.lvl', function(lvl) {
      return 50 * Math.pow(lvl, 2) - 150 * lvl + 200;
    });
    model.refList("_habitList", "_user.tasks", "_user.habitIds");
    model.refList("_dailyList", "_user.tasks", "_user.dailyIds");
    model.refList("_todoList", "_user.tasks", "_user.todoIds");
    model.refList("_rewardList", "_user.tasks", "_user.rewardIds");
    return page.render();
  }