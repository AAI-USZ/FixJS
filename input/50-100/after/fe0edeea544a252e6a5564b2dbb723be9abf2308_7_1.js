function UICalendarPortlet(){
	this.clickone = 0 ;
	this.portletId = "calendars";
	this.currentDate = 0;
	this.CELL_HEIGHT = 20;
	if(eXo.core.Browser.webkit != 0) this.CELL_HEIGHT = 21;
	this.MINUTE_PER_CELL = 30;
	this.PIXELS_PER_MINUTE = this.CELL_HEIGHT / this.MINUTE_PER_CELL; 
	this.MINUTES_PER_PIXEL = this.MINUTE_PER_CELL / this.CELL_HEIGHT;
}