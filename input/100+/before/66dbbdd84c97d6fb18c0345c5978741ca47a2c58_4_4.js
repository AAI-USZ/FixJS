function() {
    var objResizeClazz = eXo.ecm.UITimelineView.objRowClazz;
    var root = document.getElementById("UIDocumentWorkspace");
    var workingArea = document.getElementById("UIWorkingArea");
    var leftContainer = document.getElementById("LeftContainer");
    var dynamicWidth = workingArea.offsetWidth - leftContainer.offsetWidth - 6 ;    
    var listGrid = gj(root).find("div.UIListGrid:first")[0];
    root.style.overflow = "auto";
    var rightContainer = gj(listGrid).parents(".RightContainer:first")[0];
    
    if(!eXo.ecm.UITimelineView.mapColumn) return;
    for(var name in eXo.ecm.UITimelineView.mapColumn.properties) {
      var objColumn = gj(listGrid).find("div." + name + ":first")[0];
      objColumn.style.width = eXo.ecm.UITimelineView.mapColumn.properties[name];
      var rowClazz = gj(listGrid).find("div.RowView,Normal");
      for (var i in rowClazz) {
        try {
          var objColumnInRow = gj(rowClazz[i]).find("div." + name + ":first")[0];
          objColumnInRow.style.width = eXo.ecm.UITimelineView.mapColumn.properties[name];
        } catch(err) {
        }
      }
    } 
    
    //update width of UIListGrid
    eXo.ecm.ECMUtils.updateListGridWidth(); 
  }