function(obj){
    if (obj.style.display != "block") {
        eXo.core.DOMUtil.cleanUpHiddenElements();
        obj.style.display = "block";
        gj(obj).on('mouseover',eXo.calendar.UICalendarPortlet.autoHide);
        gj(obj).on('mouseout',eXo.calendar.UICalendarPortlet.autoHide);
        eXo.core.DOMUtil.listHideElements(obj);
    }
    else {
        obj.style.display = "none";
    }
}