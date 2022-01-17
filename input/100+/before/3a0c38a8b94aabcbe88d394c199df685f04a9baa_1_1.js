function prettyDate(time) {

  switch (time.constructor) {
    case String:
      time = parseInt(time);
      break;
    case Date:
      time = time.getTime();
      break;
  }

  var diff = (Date.now() - time) / 1000;
  var day_diff = Math.floor(diff / 86400);

  if (isNaN(day_diff))
    return '(incorrect date)';

  if (day_diff < 0 || diff < 0) {
    // future time
    return (new Date(time)).toLocaleFormat('%x %R');
  }

  return day_diff == 0 && ( // today?
      diff < 60 && _('justNow') ||
      diff < 3600 && _('minutesAgo', { minutes: Math.floor(diff / 60) }) ||
      diff < 86400 && _('hoursAgo', { hours: Math.floor(diff / 3600) })
  ) ||
      day_diff == 1 && _('yesterday') || // yesterday?
      day_diff < 7 && (new Date(time)).toLocaleFormat('%A') || // <1 week ago?
      (new Date(time)).toLocaleFormat('%x'); // default: standard date format
}