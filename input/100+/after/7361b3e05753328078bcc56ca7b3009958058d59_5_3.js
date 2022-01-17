function(evt) {
	eXo.calendar.EventTooltip.disable(evt);
	var _e = window.event || evt ;
	_e.stopPropagation();
	//_e.cancelBubble = true ;
	if(_e.button == 2) return ;
	var UIResizeEvent = eXo.calendar.UIResizeEvent ;
	var outerElement = gj(this).parents('.EventContainerBorder')[0]; 
	var innerElement = gj(this).prevAll('div')[0];
	var container = gj("#UIWeekViewGrid").parents('.EventWeekContent')[0];
	var minHeight = 15 ;
	var interval = eXo.calendar.UICalendarPortlet.interval ;
	UIResizeEvent.start(_e, innerElement, outerElement, container, minHeight, interval) ;
	eXo.calendar.UICalendarPortlet.dropCallback = eXo.calendar.UIWeekView.resizeCallback;
	eXo.calendar.UICalendarPortlet.setPosition(outerElement);
}