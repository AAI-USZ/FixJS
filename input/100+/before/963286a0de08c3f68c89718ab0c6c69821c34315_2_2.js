function exp_ext_triggerchange() {
    $('#display_total').html(exp_total);
    if (exp_tss_hook_flag) {
        exp_ext_reload();
        exp_chk_hook_flag = 0;
        exp_chp_hook_flag = 0;
        exp_che_hook_flag = 0;
    }
    if (exp_chk_hook_flag) {
        exp_ext_triggerCHK();
        exp_chp_hook_flag = 0;
        exp_che_hook_flag = 0;
    }
    if (exp_chp_hook_flag) {
        exp_ext_triggerCHP();
    }
    if (exp_che_hook_flag) {
        exp_ext_triggerCHE();
    }
    
    exp_tss_hook_flag = 0;
    exp_rec_hook_flag = 0;
    exp_stp_hook_flag = 0;
    exp_chk_hook_flag = 0;
    exp_chp_hook_flag = 0;
    exp_che_hook_flag = 0;
}