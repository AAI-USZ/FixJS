function(evt){
    try {
        var UISelection = eXo.calendar.UISelection;
        var src = eXo.cs.EventManager.getEventTarget(evt);
        if ((src == UISelection.block) || (eXo.cs.EventManager.getMouseButton(evt) == 2) || (gj(src).hasClass("TdTime"))) {
						return;
        }
        
        UISelection.startTime = parseInt(Date.parse(src.getAttribute("startFull")));//src.getAttribute("startTime");
        UISelection.startX = eXo.core.Browser.findPosXInContainer(src, UISelection.container) - eXo.calendar.UICalendarPortlet.portletNode.parentNode.scrollTop;
        UISelection.block.style.display = "block";
        UISelection.startY = eXo.core.Browser.findPosYInContainer(src, UISelection.container);
        UISelection.block.style.width = src.offsetWidth + "px";
        UISelection.block.style.left = UISelection.startX + "px";
        UISelection.block.style.top = UISelection.startY + "px";
        UISelection.block.style.height = UISelection.step + "px";
        UISelection.block.style.zIndex = 1; 
        eXo.calendar.UICalendarPortlet.resetZIndex(UISelection.block);
        document.onmousemove = UISelection.execute;
        document.onmouseup = UISelection.clear;
    } 
    catch (e) {
        window.status = e.message ;
    }
}