function prettyDate(time) {
  var date = new Date(time);
  var hours = date.getHours();
  var hoursStr = new String(hours);
  var minutes = date.getMinutes();
  var minutesStr = new String(minutes);
  var meridiem = 'AM';
  if (hours < 10) {
    hoursStr = '0' + hoursStr;
  } else if (hours >= 12) {
    meridiem = 'PM';
    if (hours > 12) {
      hoursStr = new String(hours - 12);
    }
  }
  if (minutes < 10) {
    minutesStr = '0' + minutesStr;
  }
  return (hoursStr + ':' + minutesStr + ' ' + meridiem);
}