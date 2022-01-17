function ts_ext_set_tableWrapperWidths() {
    ts_ext_get_dimensions();
    // zef: set width of table and faked table head  
    $("#zef_head,#zef").css("width",zef_w);
    ts_ext_set_TableWidths();
}