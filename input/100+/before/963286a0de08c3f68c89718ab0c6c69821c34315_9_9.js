function lists_set_TableWidths() {
    lists_get_dimensions();
    // set table widths   
    ($("#usr").innerHeight()-$("#usr table").outerHeight()>0)?scr=0:scr=scroller_width; // same goes for subtables ....
    $("#usr table").css("width",usr_w-scr);
    ($("#knd").innerHeight()-$("#knd table").outerHeight()>0)?scr=0:scr=scroller_width; // same goes for subtables ....
    $("#knd table").css("width",knd_w-scr);
    ($("#pct").innerHeight()-$("#pct table").outerHeight()>0)?scr=0:scr=scroller_width;
    $("#pct table").css("width",pct_w-scr);
    ($("#evt").innerHeight()-$("#evt table").outerHeight()>0)?scr=0:scr=scroller_width;
    $("#evt table").css("width",evt_w-scr);
}