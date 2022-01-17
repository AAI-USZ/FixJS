function(obj){
    if (obj.style.display != "block") {
        eXo.core.DOMUtil.cleanUpHiddenElements();
        obj.style.display = "block";
        obj.onmouseover = eXo.calendar.UICalendarPortlet.autoHide;
        obj.onmouseout = eXo.calendar.UICalendarPortlet.autoHide;
        eXo.core.DOMUtil.listHideElements(obj);
    }
    else {
        obj.style.display = "none";
    }
}