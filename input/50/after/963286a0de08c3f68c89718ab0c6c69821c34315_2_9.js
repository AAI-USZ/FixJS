function expense_extension_triggerCHE() {
    if ($('.ki_expenses').css('display') == "block") {
        expense_extension_reload();
    } else {
        expense_che_hook_flag++;
    }
}