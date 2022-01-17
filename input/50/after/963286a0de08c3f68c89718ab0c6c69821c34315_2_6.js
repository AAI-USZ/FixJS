function expense_extension_triggerTSS() {
    if ($('.ki_expenses').css('display') == "block") {
        expense_extension_reload();
    } else {
        expense_tss_hook_flag++;
    }
}