function ut_giveHeaderDate(time) {
    switch (time.constructor) {
      case String:
        time = new Number(time);
        break;
      case Date:
        time = time.getTime();
        break;
    }

    var today = Math.floor((new Date()).getTime() / 86400000);
    var otherDay = Math.floor(time / 86400000);
    var dayDiff = today - otherDay;

    if (isNaN(dayDiff))
      return '(incorrect date)';

    if (dayDiff < 0) {
      // future time
      return (new Date(time)).toLocaleFormat('%x %R');
    }

    return dayDiff == 0 && _('today') ||
      dayDiff == 1 && _('yesterday') ||
      dayDiff < 4 && (new Date(time)).toLocaleFormat('%A') ||
      (new Date(time)).toLocaleFormat('%x');
  }