function dh_thisWeekStarted() {
    var now = new Date();
    var dayOfTheWeek = now.getDay();
    var offset = 1 - dayOfTheWeek;
    var firstDay = now.valueOf() + offset * 86400000;
    return this.getMidnight(firstDay);
  }