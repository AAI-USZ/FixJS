function() {
	var UICalendarPortlet = eXo.calendar.UICalendarPortlet ;
	var UIWeekView = eXo.calendar.UIWeekView ;
	var uiCalendarViewContainer = document.getElementById("UICalendarViewContainer") ;
	var allEvents = gj(uiCalendarViewContainer).find('div.EventContainerBorder');
	this.container = document.getElementById("UIWeekViewGrid") ;
	var EventWeekContent = gj(this.container).parents(".EventWeekContent")[0] ;
	this.items = new Array() ;
	eXo.calendar.UICalendarPortlet.viewType = "UIWeekView" ;
	for(var i = 0 ; i < allEvents.length ; i ++) {
		if(allEvents[i].style.display != "none") this.items.push(allEvents[i]) ;
	}
	var len = UIWeekView.items.length ;
  //UICalendarPortlet.setFocus() ;
	if (len <= 0) {
		this.initAllday() ;
		return;
	}	
	var marker = null ;
	for(var i = 0 ; i < len ; i ++){		
		var height = parseInt(this.items[i].getAttribute("endTime")) - parseInt(this.items[i].getAttribute("startTime")) ;
		this.items[i].onmousedown = UIWeekView.dragStart;
		this.items[i].onmouseover = eXo.calendar.EventTooltip.show;
		this.items[i].onmouseout = eXo.calendar.EventTooltip.hide;
		this.items[i].ondblclick = eXo.calendar.UICalendarPortlet.ondblclickCallback;
		marker = gj(this.items[i]).find('div.ResizeEventContainer')[0];
		marker.onmousedown = UIWeekView.initResize;
	}
	var tr = gj(this.container).find('tr'); 
	var firstTr = null ;
	for(var i = 0 ; i < tr.length ; i ++) {
		if (tr[i].style.display != "none") {
			firstTr = tr[i] ;
			break ;
		}
	}
	this.cols = gj(firstTr).find("td") ;
	this.distributeEvent() ;
	this.setSize() ;
	this.initAllday() ;
	//UICalendarPortlet.setFocus() ;
}