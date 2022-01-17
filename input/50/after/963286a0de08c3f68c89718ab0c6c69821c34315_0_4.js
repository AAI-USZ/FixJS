function adminPanel_extension_triggerCHP() {
    if ($('.adminPanel_extension').css('display') == "block") {
        adminPanel_extension_refreshSubtab('projects');
    } else {
        ap_chp_hook_flag++;
    }
}