function(evt){
		var self = eXo.calendar.EventTooltip;
		if(self._container) delete self._container;
		if(!self._container){
			var eventNode = eXo.cs.EventManager.getEventTarget(evt);
			eventNode = gj(eventNode).parents('.UICalendarPortlet')[0]; 
			self._container = gj(eventNode).find('div.UICalendarEventTooltip')[0]; 
			gj(self._container).on("mouseover",function(evt){
				self.cleanupTimer(evt);
			});
			gj(self._container).on("mouseout",function(evt){
				self.hide(evt);
			});
			gj(self._container).on("click",function(evt){
				self.hideElement();
				self.editEvent(self.currentEvent);
			});
		}
	}