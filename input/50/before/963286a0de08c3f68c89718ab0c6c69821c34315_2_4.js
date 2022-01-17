function exp_ext_set_tableWrapperWidths() {
    exp_ext_get_dimensions();
    $("#exp_head,#exp").css("width",exp_w);
    exp_ext_set_TableWidths();
}