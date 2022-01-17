function(){
	var UICalendarPortlet = eXo.calendar.UICalendarPortlet;
	var UISelection = eXo.calendar.UISelection;
	var endTime = UICalendarPortlet.pixelsToMins(UISelection.block.offsetHeight) * 60 * 1000 + parseInt(UISelection.startTime);
	var startTime = UISelection.startTime;
	var bottom = UISelection.block.offsetHeight + UISelection.block.offsetTop;

	if (UISelection.block.offsetTop < UISelection.startY) {
		startTime = parseInt(UISelection.startTime) - UICalendarPortlet.pixelsToMins(UISelection.block.offsetHeight) * 60 * 1000 + UICalendarPortlet.MINUTE_PER_CELL * 60 * 1000;
		endTime = parseInt(UISelection.startTime) + UICalendarPortlet.MINUTE_PER_CELL * 60 * 1000;
	}
	if(bottom >= UISelection.container.offsetHeight) endTime -= 1;
	var container = UICalendarPortlet.getElementById("UICalendarViewContainer");
	UICalendarPortlet.addQuickShowHiddenWithTime(container, 1, startTime, endTime) ;
	//eXo.webui.UIForm.submitEvent(UISelection.viewType, 'QuickAdd', '&objectId=Event&startTime=' + startTime + '&finishTime=' + endTime);
	eXo.core.DOMUtil.listHideElements(UISelection.block);
	UISelection.startTime = null;
	UISelection.startY = null;
	UISelection.startX = null;
	document.onmousemove = null;
	document.onmouseup = null;
}