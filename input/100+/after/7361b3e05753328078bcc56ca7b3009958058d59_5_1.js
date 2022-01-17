function() {
	var UIWeekView = eXo.calendar.UIWeekView ;
	var len = UIWeekView.cols.length ;
	for(var i = 1 ; i < len ; i ++) {
		if (gj(UIWeekView.cols[i]).children('div.EventContainerBorder').length < 0)
			return ;
		var colIndex = parseInt(UIWeekView.cols[i].getAttribute("eventindex")) ;
		var eventIndex = null ;
		for(var j = 0 ; j < UIWeekView.items.length ; j ++){		
			eventIndex = parseInt(UIWeekView.items[j].getAttribute("eventindex")) ;
			if (colIndex == eventIndex) UIWeekView.cols[i].appendChild(UIWeekView.items[j]) ;
		}			
	}
}