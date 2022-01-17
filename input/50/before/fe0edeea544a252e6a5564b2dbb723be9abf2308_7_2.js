function(minutes) {
  var UICalendarPortlet = eXo.calendar.UICalendarPortlet;
  return Math.ceil(minutes * UICalendarPortlet.PIXELS_PER_MINUTE);
}