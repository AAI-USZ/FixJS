function() {
    var DAY, daysPassed, lastCron, today;
    lastCron = model.get('_user.lastCron');
    if (lastCron) {
      lastCron = new Date(model.get('_user.lastCron'));
    } else {
      lastCron = new Date();
      model.set('_user.lastCron', lastCron);
    }
    lastCron = new Date("" + (lastCron.getMonth()) + "/" + (lastCron.getDate()) + "/" + (lastCron.getFullYear()));
    console.log(lastCron);
    DAY = 1000 * 60 * 60 * 24;
    today = new Date();
    today = new Date("" + (today.getMonth()) + "/" + (today.getDate()) + "/" + (today.getFullYear()));
    daysPassed = Math.floor((today.getTime() - lastCron.getTime()) / DAY);
    if (daysPassed > 0) {
      _(daysPassed).times(function() {
        return endOfDayTally();
      });
      return model.set('_user.lastCron', today);
    }
  }