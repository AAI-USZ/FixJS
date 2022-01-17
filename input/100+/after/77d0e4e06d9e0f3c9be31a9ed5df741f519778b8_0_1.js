function(user, task, direction, cron) {
  var adjustvalue, completed, delta, exp, hp, lvl, money, sign, type, value, _ref;
  sign = direction === "up" ? 1 : -1;
  value = task.get('value');
  delta = value < 0 ? (-0.1 * value + 1) * sign : (Math.pow(0.9, value)) * sign;
  type = task.get('type');
  adjustvalue = type !== 'reward';
  if ((type === 'habit') && (task.get("up") === false || task.get("down") === false)) {
    adjustvalue = false;
  }
  if (adjustvalue) {
    value += delta;
  }
  completed = task.get("completed");
  if (type !== 'habit') {
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
  _ref = [user.get('stats.money'), user.get('stats.hp'), user.get('stats.exp'), user.get('stats.lvl')], money = _ref[0], hp = _ref[1], exp = _ref[2], lvl = _ref[3];
  if (type === 'reward') {
    money -= task.get('value');
    if (money < 0) {
      hp += money;
      money = 0;
    }
  }
  if (delta > 0 || ((type === 'daily' || type === 'todo') && !cron)) {
    exp += expModifier(user, delta);
    money += delta;
  } else if (type !== 'reward' && type !== 'todo') {
    hp += hpModifier(user, delta);
  }
  updateStats(user, {
    hp: hp,
    exp: exp,
    money: money
  });
  return delta;
}