function lists_set_tableWrapperWidths() {
    lists_get_dimensions();
    $('#extShrink').css("width",pageWidth()-22);
    // set width of faked table heads of subtables -----------------
    $("#user_head, #user_foot").css("width",userColumnWidth-5);
    $("#customer_head, #customer_foot").css("width",customerColumnWidth-5); // subtract the left padding inside the header
    $("#project_head, #project_foot").css("width",projectColumnWidth-5); // which is 5px
    $("#activity_head, #activity_foot").css("width",activityColumnWidth-5);
    $("#user").css("width",userColumnWidth);
    $("#customer").css("width",customerColumnWidth);
    $("#project").css("width",projectColumnWidth);
    $("#activity").css("width",activityColumnWidth);
    lists_set_left();
    lists_set_TableWidths();
}