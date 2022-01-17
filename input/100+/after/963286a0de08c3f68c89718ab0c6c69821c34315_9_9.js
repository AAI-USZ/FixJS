function lists_set_TableWidths() {
    lists_get_dimensions();
    // set table widths   
    ($("#user").innerHeight()-$("#user table").outerHeight()>0)?scr=0:scr=scroller_width; // same goes for subtables ....
    $("#user table").css("width",userColumnWidth-scr);
    ($("#customer").innerHeight()-$("#customer table").outerHeight()>0)?scr=0:scr=scroller_width; // same goes for subtables ....
    $("#customer table").css("width",customerColumnWidth-scr);
    ($("#project").innerHeight()-$("#project table").outerHeight()>0)?scr=0:scr=scroller_width;
    $("#project table").css("width",projectColumnWidth-scr);
    ($("#activity").innerHeight()-$("#activity table").outerHeight()>0)?scr=0:scr=scroller_width;
    $("#activity table").css("width",activityColumnWidth-scr);
}