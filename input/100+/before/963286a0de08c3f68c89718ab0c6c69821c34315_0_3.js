function ap_ext_triggerchange() {
    if ($('.ap_ext').css('display') == "block") {
        ap_ext_refreshSubtab('knd');
        ap_ext_refreshSubtab('pct');
        ap_ext_refreshSubtab('evt');
    } else {
        tss_hook_flag++;
    }
    if (ap_chk_hook_flag) {
        ap_ext_triggerCHK();
    }
    if (ap_chp_hook_flag) {
        ap_ext_triggerCHP();
    }
    if (ap_che_hook_flag) {
        ap_ext_triggerCHE();
    }
    if (ap_usr_hook_flag) {
        ap_ext_triggerUSR();
    }
    
    ap_tss_hook_flag = 0;
    ap_rec_hook_flag = 0;
    ap_stp_hook_flag = 0;
    ap_chk_hook_flag = 0;
    ap_chp_hook_flag = 0;
    ap_che_hook_flag = 0;
    ap_usr_hook_flag = 0;
}