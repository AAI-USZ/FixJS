function(minutes) {
  var UICalendarPortlet = eXo.calendar.UICalendarPortlet;
  return Math.round(minutes / UICalendarPortlet.MINUTE_PER_CELL) * UICalendarPortlet.CELL_HEIGHT;
}