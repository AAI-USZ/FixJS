function ts_ext_onload() {
    ts_ext_applyHoverIntent2zefRows();
    ts_ext_resize();
    $("#loader").hide();
    lists_visible(true);
}