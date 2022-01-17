function(pixels) {
  var UICalendarPortlet = eXo.calendar.UICalendarPortlet;
  return Math.round(pixels/UICalendarPortlet.CELL_HEIGHT) * UICalendarPortlet.MINUTE_PER_CELL;
}