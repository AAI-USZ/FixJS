function(evt) {
	eXo.calendar.EventTooltip.disable(evt);
	var _e = window.event || evt ;
	if (_e.button == 2) return ;
	var UIWeekView = eXo.calendar.UIWeekView ;
	var DragDrop = eXo.cs.DragDrop ;
	var EventAllday = gj(this).parents('.EventAllday')[0];
	dragObject = this ;
	UIWeekView.totalWidth = EventAllday.offsetWidth ;
	UIWeekView.elementTop = dragObject.offsetTop ;
	UIWeekView.elementLeft = dragObject.offsetLeft ;
	DragDrop.initCallback = UIWeekView.allDayInitCallback ;
	DragDrop.dragCallback = UIWeekView.allDayDragCallback ;
	DragDrop.dropCallback = UIWeekView.allDayDropCallback ;
	DragDrop.init(null, dragObject, dragObject, _e) ;	
}