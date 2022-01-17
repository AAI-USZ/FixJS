function(evt){
  var _e = window.event || evt;
  _e.cancelBubble = true;
  var UIResizeEvent = eXo.calendar.UIResizeEvent;
  var outerElement = gj(this).parents('.EventBoxes')[0];
  var innerElement = gj(this).prevAll("div")[0];
  var container = gj(outerElement).parents('.EventDayContainer')[0];
  var minHeight = 15;
  var interval = eXo.calendar.UICalendarPortlet.interval;
  UIResizeEvent.start(_e, innerElement, outerElement, container, minHeight, interval);
    //UIResizeEvent.callback = UIResizeEvent.resizeCallback;
	eXo.calendar.UICalendarPortlet.dropCallback = UIResizeEvent.resizeCallback;
	eXo.calendar.UICalendarPortlet.setPosition(outerElement);
	eXo.calendar.EventTooltip.disable(evt);
}