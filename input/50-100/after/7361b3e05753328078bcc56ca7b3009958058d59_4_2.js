function(response){
	var me = eXo.calendar.UICalendarPortlet ;
	eval("var data = " + response.responseText);
	var isEdit = data.permission;
	if(!isEdit){
		me.notify(me.activeEventObject);		
		me.restorePosition(me.activeEventObject);
	} else{
		if(me.dropCallback) me.dropCallback();
		delete me.activeEventObject ;
		delete me.restoreSize;
	}
}