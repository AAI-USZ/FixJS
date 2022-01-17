function() {
	var UIWeekView = eXo.calendar.UIWeekView ;
	var uiWeekView = document.getElementById("UIWeekView") ;
	var uiWeekViewGridAllDay = gj(uiWeekView).find('table.UIGrid')[0]; 
	this.eventAlldayContainer = gj(uiWeekView).find('div.EventAlldayContainer');
	var eventAllday = new Array() ;
	for(var i = 0 ; i < this.eventAlldayContainer.length ; i ++) {
		if (this.eventAlldayContainer[i].style.display != "none") eventAllday.push(this.eventAlldayContainer[i]) ;
	}
	var len = eventAllday.length ;
	if (len <= 0) return ;
	var resizeMark = null ;
	for(var i = 0 ; i < len ; i ++) {
		resizeMark = gj(eventAllday[i]).children("div") ;
		if (gj(resizeMark[0]).hasClass("ResizableSign"))
			resizeMark[0].onmousedown = UIWeekView.initAllDayLeftResize;
		if (gj(resizeMark[2]).hasClass("ResizableSign")) {
			resizeMark[2].onmousedown = UIWeekView.initAllDayRightResize;
		}
		eventAllday[i].onmouseover = eXo.calendar.EventTooltip.show;
		eventAllday[i].onmouseout = eXo.calendar.EventTooltip.hide;
		eventAllday[i].onmousedown = eXo.calendar.UIWeekView.initAlldayDND;
		eventAllday[i].ondblclick = eXo.calendar.UICalendarPortlet.ondblclickCallback;
	}
	var EventAlldayContainer = gj(uiWeekViewGridAllDay).find('td.EventAllday')[0]; 
	this.weekdays = gj(uiWeekViewGridAllDay).find('td.UICellBlock');
	this.startWeek = 	UIWeekView.weekdays[1] ;
	this.endWeek = 	UIWeekView.weekdays[UIWeekView.weekdays.length-1] ;
}