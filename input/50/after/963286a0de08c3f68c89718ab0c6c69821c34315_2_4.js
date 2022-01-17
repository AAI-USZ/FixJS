function expense_extension_set_tableWrapperWidths() {
    expense_extension_get_dimensions();
    $("#expenses_head,#expenses").css("width",expenses_width);
    expense_extension_set_TableWidths();
}