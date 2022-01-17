function expense_extension_triggerCHK() {
    if ($('.ki_expenses').css('display') == "block") {
        expense_extension_reload();
    } else {
        expense_chk_hook_flag++;
    }
}