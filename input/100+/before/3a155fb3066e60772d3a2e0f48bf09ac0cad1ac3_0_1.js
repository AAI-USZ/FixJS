function() {
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
  }