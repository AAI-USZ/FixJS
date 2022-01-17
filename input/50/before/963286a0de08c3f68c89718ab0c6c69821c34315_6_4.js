function ts_ext_set_heightTop() {
    ts_ext_get_dimensions();
    if (!extShrinkMode) {
        $("#zef").css("height", zef_h);
    } else {
        $("#zef").css("height", "70px");
    }
    
    ts_ext_set_TableWidths();
}