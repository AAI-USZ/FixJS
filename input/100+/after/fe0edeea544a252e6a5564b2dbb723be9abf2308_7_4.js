function(evt){
	evt.stopPropagation();
    var eventId = this.getAttribute("eventId");
    var calendarId = this.getAttribute("calid");
    var calendarType = this.getAttribute("caltype");
	var isOccur = this.getAttribute("isOccur");
	var recurId = this.getAttribute("recurId");
	if (recurId == "null") recurId = "";
    eXo.webui.UIForm.submitEvent(eXo.calendar.UICalendarPortlet.portletId + '#' + eXo.calendar.UICalendarPortlet.viewType, 'Edit', '&subComponentId=' + eXo.calendar.UICalendarPortlet.viewType + '&objectId=' + eventId + '&calendarId=' + calendarId + '&calType=' + calendarType + '&isOccur=' + isOccur + '&recurId=' + recurId);
}