function expense_extension_triggerCHP() {
    if ($('.ki_expenses').css('display') == "block") {
        expense_extension_reload();
    } else {
        expense_chp_hook_flag++;
    }
}