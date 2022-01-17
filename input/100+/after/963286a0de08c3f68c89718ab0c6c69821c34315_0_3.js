function adminPanel_extension_triggerchange() {
    if ($('.adminPanel_extension').css('display') == "block") {
        adminPanel_extension_refreshSubtab('customers');
        adminPanel_extension_refreshSubtab('projects');
        adminPanel_extension_refreshSubtab('activities');
    } else {
        tss_hook_flag++;
    }
    if (ap_chk_hook_flag) {
        adminPanel_extension_triggerCHK();
    }
    if (ap_chp_hook_flag) {
        adminPanel_extension_triggerCHP();
    }
    if (ap_che_hook_flag) {
        adminPanel_extension_triggerCHE();
    }
    if (ap_usr_hook_flag) {
        adminPanel_extension_triggerUSR();
    }
    
    ap_tss_hook_flag = 0;
    ap_rec_hook_flag = 0;
    ap_stp_hook_flag = 0;
    ap_chk_hook_flag = 0;
    ap_chp_hook_flag = 0;
    ap_che_hook_flag = 0;
    ap_usr_hook_flag = 0;
}