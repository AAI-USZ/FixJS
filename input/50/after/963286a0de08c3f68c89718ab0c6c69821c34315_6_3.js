function ts_ext_set_tableWrapperWidths() {
    ts_ext_get_dimensions();
    $("#timeSheet_head,#timeSheet").css("width",timeSheet_width);
    ts_ext_set_TableWidths();
}