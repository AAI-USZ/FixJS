function ts_ext_set_heightTop() {
    ts_ext_get_dimensions();
    if (!extShrinkMode) {
        $("#timeSheet").css("height", timeSheet_height);
    } else {
        $("#timeSheet").css("height", "70px");
    }
    
    ts_ext_set_TableWidths();
}