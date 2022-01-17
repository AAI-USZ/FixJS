function xp_ext_set_tableWrapperWidths() {
    xp_ext_get_dimensions();
    // zef: set width of table and faked table head  
    $("#xp_head,#xp").css("width",xp_w);
    xp_ext_set_TableWidths();
}