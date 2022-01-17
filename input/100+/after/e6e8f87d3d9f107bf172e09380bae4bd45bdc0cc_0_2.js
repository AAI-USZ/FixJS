function() {
    var DAY, daysPassed, lastCron, n, today, _k, _results;
    model.setNull('_user.lastCron', new Date());
    lastCron = new Date((new Date(model.get('_user.lastCron'))).toDateString());
    today = new Date((new Date).toDateString());
    DAY = 1000 * 60 * 60 * 24;
    daysPassed = Math.floor((today.getTime() - lastCron.getTime()) / DAY);
    if (daysPassed > 0) {
      model.set('_user.lastCron', today);
      _results = [];
      for (n = _k = 1; 1 <= daysPassed ? _k <= daysPassed : _k >= daysPassed; n = 1 <= daysPassed ? ++_k : --_k) {
        console.log({
          today: today,
          lastCron: lastCron,
          daysPassed: daysPassed,
          n: n
        }, "[debug] Cron (" + today + ", " + n + ")");
        _results.push(endOfDayTally());
      }
      return _results;
    }
  }