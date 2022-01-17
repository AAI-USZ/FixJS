function(pixels) {
  var UICalendarPortlet = eXo.calendar.UICalendarPortlet;
  return Math.ceil(pixels * UICalendarPortlet.MINUTES_PER_PIXEL);
}