function(element,styleToRemove) {
    if(element == undefined || styleToRemove == undefined) {
        return false;
    }
    var style = dojo.attr(element, "style");
    // console.debug("deleting style: " + styleToRemove + " for stlye: "+ style);
    if(style != undefined && style.indexOf(styleToRemove)!= -1){
        // console.debug("deleting style: " + styleToRemove + " for stlye: "+ style);
        style.replace(styleToRemove,"");
        dojo.attr(element, "style", style);
        return true;
    }
    return false; 
}