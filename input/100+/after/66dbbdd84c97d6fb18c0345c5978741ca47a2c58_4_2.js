function(obj, event) {
    var event = event || window.event;
    event.cancelBubble = true;
    
    var listGrid = gj(obj).parents(".UIListGrid:first")[0];
    var rowClazz = gj(listGrid).find("div.RowView,div.Normal");           
    if(!eXo.ecm.UITimelineView.mapColumn) {
      eXo.ecm.UITimelineView.mapColumn = new eXo.core.HashMap();
    }   
    var objResize = obj;                  
    objResize.style.display = "none";
    
    // Resize the whole column
    try {
	  rowClazz.each(function(i, elem) {       
        var objColumn = gj(rowClazz[i]).find("div." + objResize.className + ":first")[0];
        objColumn.style.display = "none";       
      });
    } catch(err) {}           
  }