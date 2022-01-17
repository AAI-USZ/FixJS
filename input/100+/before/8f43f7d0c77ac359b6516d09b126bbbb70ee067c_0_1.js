function() {
    var DAY, daysPassed, lastCron, today;
    lastCron = model.get('_user.lastCron');
    lastCron = lastCron ? new Date(lastCron) : new Date();
    DAY = 1000 * 60 * 60 * 24;
    today = new Date();
    daysPassed = Math.floor((today.getTime() - lastCron.getTime()) / DAY);
    if (daysPassed > 0) {
      _(daysPassed).times(function() {
        return endOfDayTally();
      });
      lastCron = new Date();
    }
    return model.set('_user.lastCron', lastCron);
  }