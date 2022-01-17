function expense_extension_triggerchange() {
    $('#display_total').html(expenses_total);
    if (expense_tss_hook_flag) {
        expense_extension_reload();
        expense_chk_hook_flag = 0;
        expense_chp_hook_flag = 0;
        expense_che_hook_flag = 0;
    }
    if (expense_chk_hook_flag) {
        expense_extension_triggerCHK();
        expense_chp_hook_flag = 0;
        expense_che_hook_flag = 0;
    }
    if (expense_chp_hook_flag) {
        expense_extension_triggerCHP();
    }
    if (expense_che_hook_flag) {
        expense_extension_triggerCHE();
    }
    
    expense_tss_hook_flag = 0;
    expense_rec_hook_flag = 0;
    expense_stp_hook_flag = 0;
    expense_chk_hook_flag = 0;
    expense_chp_hook_flag = 0;
    expense_che_hook_flag = 0;
}