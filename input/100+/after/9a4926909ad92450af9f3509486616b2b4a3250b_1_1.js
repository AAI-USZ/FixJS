function ut_giveHeaderDate(time) {
    switch (time.constructor) {
      case String:
        time = new Number(time);
        break;
      case Date:
        time = time.getTime();
        break;
    }

    var today = Utils.getDayDate((new Date()).getTime());
    var otherDay = Utils.getDayDate(time);
    var dayDiff = (today - otherDay) / 86400000;

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