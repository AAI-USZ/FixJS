function exp_ext_set_heightTop() {
    exp_ext_get_dimensions();
    if (!extShrinkMode) {
        $("#exp").css("height", exp_h);
    } else {
        $("#exp").css("height", "70px");
    }
    
    exp_ext_set_TableWidths();
}