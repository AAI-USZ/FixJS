function(evt) {
	eXo.calendar.EventTooltip.disable(evt);
	var _e = window.event || evt ;
	_e.stopPropagation();
	//_e.cancelBubble = true ;
	if (_e.button == 2) return ;
	var UIWeekView = eXo.calendar.UIWeekView ;
	UIWeekView.dragElement = this ;
	eXo.calendar.UICalendarPortlet.resetZIndex(UIWeekView.dragElement) ;
	UIWeekView.objectOffsetLeft = eXo.core.Browser.findPosX(UIWeekView.dragElement) ;
	UIWeekView.offset = UIWeekView.getOffset(UIWeekView.dragElement, _e) ;
	UIWeekView.mouseY = _e.clientY ;
	UIWeekView.mouseX = _e.clientX ;
	UIWeekView.eventY = UIWeekView.dragElement.offsetTop ;
	UIWeekView.containerOffset = {
		"x" : eXo.core.Browser.findPosX(UIWeekView.container.parentNode),
		"y" : eXo.cs.Browser.findPosY(UIWeekView.container.parentNode)
	}
	UIWeekView.title = gj(UIWeekView.dragElement).find('p')[0].innerHTML;
//	gj(this.container).on('mousemove',UIWeekView.drag);
//	gj(this.container).on('mouseup',UIWeekView.drop);
	document.onmousemove = UIWeekView.drag ;
	document.onmouseup = UIWeekView.drop ;
	eXo.calendar.UICalendarPortlet.dropCallback = UIWeekView.dropCallback ;
	eXo.calendar.UICalendarPortlet.setPosition(UIWeekView.dragElement);
}