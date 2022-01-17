function adminPanel_extension_triggerCHK() {
    if ($('.adminPanel_extension').css('display') == "block") {
        adminPanel_extension_refreshSubtab('customers');
        adminPanel_extension_refreshSubtab('projects');
    } else {
        ap_chk_hook_flag++;
    }
}