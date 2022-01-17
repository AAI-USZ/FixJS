function expense_extension_onload() {
    expense_extension_applyHoverIntent();
    expense_extension_resize();
    $("#loader").hide();
    lists_visible(true);
}