function(evt){
    var UISelection = eXo.calendar.UISelection;
    var _e = window.event || evt;
    var delta = null;
	var containerHeight = UISelection.container.offsetHeight;
    var scrollTop = eXo.cs.Utils.getScrollTop(UISelection.block);
    var mouseY = eXo.core.Browser.findMouseRelativeY(UISelection.container, _e);// + UISelection.relativeObject.scrollTop;
    if (document.getElementById("UIPageDesktop")) 
        mouseY = eXo.core.Browser.findMouseRelativeY(UISelection.container, _e) + scrollTop;
    var posY = UISelection.block.offsetTop;
    var height = UISelection.block.offsetHeight;
    delta = posY + height - mouseY;
    if (UISelection.startY < mouseY) {
        UISelection.block.style.top = UISelection.startY + "px";
        if (delta >= UISelection.step) {
            UISelection.block.style.height = height - UISelection.step + "px";
        }
        if ((mouseY >= (posY + height)) && ((posY + height)< containerHeight) ) {
            UISelection.block.style.height = height + UISelection.step + "px";
        }
    }
    else {
        delta = mouseY - posY;
        UISelection.block.style.bottom = UISelection.startY - UISelection.step + "px";
        if ((mouseY <= posY) && (posY > 0)) {
            UISelection.block.style.top = posY - UISelection.step + "px";
            UISelection.block.style.height = height + UISelection.step + "px";
        }
        if (delta >= UISelection.step) {
            UISelection.block.style.top = posY + UISelection.step + "px";
            UISelection.block.style.height = height - UISelection.step + "px";
        }
    }
    
}