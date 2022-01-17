function(){
		var offsetTooltip = this._container.offsetParent;
		var offsetEvent = this.currentEvent.offsetParent;
		if(eXo.calendar.UICalendarPortlet.viewType == "UIDayView") 
			offsetEvent = gj(offsetEvent).parents(".EventDayContainer")[0];
		var extraY = (this.currentEvent.offsetHeight - this._container.offsetHeight)/2
		var extraX = 0;
		var x = eXo.core.Browser.findPosXInContainer(this.currentEvent,offsetTooltip) + this.currentEvent.offsetWidth;
		var y = eXo.core.Browser.findPosYInContainer(this.currentEvent,offsetTooltip) + extraY;		
		this._container.style.top = y + "px";
		this._container.style.left = x + "px";
		var relativeX = eXo.core.Browser.findPosX(this._container) + this._container.offsetWidth;
		if(relativeX > document.documentElement.offsetWidth) {
			extraX = document.documentElement.offsetWidth - relativeX;
			x += extraX;
			this._container.style.left = x + "px";
		}
	}