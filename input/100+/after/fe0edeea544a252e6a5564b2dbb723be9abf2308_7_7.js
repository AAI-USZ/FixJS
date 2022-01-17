function(evt){
		var self = eXo.calendar.EventTooltip;
		if(self._container) delete self._container;
		if(!self._container){
			var eventNode = eXo.cs.EventManager.getEventTarget(evt);
			eventNode = gj(eventNode).parents('.UICalendarPortlet')[0]; 
			self._container = gj(eventNode).find('div.UICalendarEventTooltip')[0];
			self._container.onmouseover = function(evt){
				self.cleanupTimer(evt);
				}; 
		    self._container.onmouseout = function(evt){
				self.hide(evt);
			}; 	
			self._container.onclick = function(evt){
				self.hideElement();
				self.editEvent(self.currentEvent);
			}; 
		}
	}