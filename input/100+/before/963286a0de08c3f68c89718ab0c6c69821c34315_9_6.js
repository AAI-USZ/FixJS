function lists_set_tableWrapperWidths() {
    lists_get_dimensions();
    $('#extShrink').css("width",pageWidth()-22);
    // set width of faked table heads of subtables -----------------
    $("#usr_head, #usr_foot").css("width",usr_w-5);
    $("#knd_head, #knd_foot").css("width",knd_w-5); // subtract the left padding inside the header
    $("#pct_head, #pct_foot").css("width",pct_w-5); // which is 5px
    $("#evt_head, #evt_foot").css("width",evt_w-5);
    $("#usr").css("width",usr_w);
    $("#knd").css("width",knd_w);
    $("#pct").css("width",pct_w);
    $("#evt").css("width",evt_w);
    lists_set_left();
    lists_set_TableWidths();
}