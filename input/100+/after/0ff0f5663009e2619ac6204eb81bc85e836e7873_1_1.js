function giveHeaderDate(time) {
  switch (time.constructor) {
    case String:
      time = new Number(time);
      break;
    case Date:
      time = time.getTime();
      break;
  }

  var today = Math.floor((new Date()).getTime() / 86400000);
  var other_day = Math.floor(time / 86400000);
  var day_diff = today - other_day;

  if (isNaN(day_diff))
    return '(incorrect date)';

  if (day_diff < 0) {
    // future time
    return (new Date(time)).toLocaleFormat('%x %R');
  }

  return day_diff == 0 && ('TODAY') ||
    day_diff == 1 && _('yesterday') ||
    day_diff < 4 && (new Date(time)).toLocaleFormat('%A') ||
    (new Date(time)).toLocaleFormat('%x');
}