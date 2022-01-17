function(){
    this.init();
    var EventDayContainer = gj(this.viewer).parents(".EventDayContainer")[0];
	if (!EventDayContainer) return ;
//    this.setFocus(this.viewer, EventDayContainer);
    this.editAlldayEvent(EventDayContainer);
    if (!this.init()) 
        return;
    this.viewType = "UIDayView";
    var el = this.getElements(this.viewer);
    el = this.sortByAttribute(el, "startTime");
    if (el.length <= 0) 
        return;
    var marker = null;
    for (var i = 0; i < el.length; i++) {
        this.setSize(el[i]);
        el[i].onmouseover = eXo.calendar.EventTooltip.show;
        el[i].onmouseout = eXo.calendar.EventTooltip.hide;
        el[i].onmousedown = eXo.calendar.UICalendarPortlet.initDND;
	    el[i].ondblclick = eXo.calendar.UICalendarPortlet.ondblclickCallback;        
        marker = gj(el[i]).children("div.ResizeEventContainer")[0];
        marker.onmousedown = eXo.calendar.UIResizeEvent.init;
    }
    this.items = el;
    this.adjustWidth(this.items);
    this.items = null;
    this.viewer = null;
}