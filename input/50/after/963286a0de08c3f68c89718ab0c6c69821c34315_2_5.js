function expense_extension_set_heightTop() {
    expense_extension_get_dimensions();
    if (!extShrinkMode) {
        $("#expenses").css("height", expenses_height);
    } else {
        $("#expenses").css("height", "70px");
    }
    
    expense_extension_set_TableWidths();
}