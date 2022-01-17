function(obj, event) {
    //disable text selection on browsers
    document.onmousedown = function(){return false};   
    document.onselectstart = function(){return false};
    var event = event || window.event;
    event.cancelBubble = true;
    var previousClass = gj(obj).prevAll("div:first")[0];         
    var listGrid = gj(previousClass).parents(".UIListGrid:first")[0];
    var rowClazz = gj(listGrid).find("div.RowView,Normal");       
    if(!eXo.ecm.UITimelineView.mapColumn) {
      eXo.ecm.UITimelineView.mapColumn = new eXo.core.HashMap();
    }
    eXo.ecm.UITimelineView.currentMouseX = event.clientX;     
    eXo.ecm.UITimelineView.listGrid = listGrid;
    eXo.ecm.UITimelineView.objResize = previousClass;   
    eXo.ecm.UITimelineView.objRowClazz = rowClazz;
    eXo.ecm.UITimelineView.objResizeValue = previousClass.offsetWidth;        
    document.onmousemove = eXo.ecm.UITimelineView.resizeMouseMoveTimelineView;    
    document.onmouseup = eXo.ecm.UITimelineView.resizeMouseUpTimelineView;
  }