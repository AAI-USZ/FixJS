function adminPanel_extension_triggerUSR() {
    if ($('.adminPanel_extension').css('display') == "block") {
        adminPanel_extension_refreshSubtab('users');
    } else {
        ap_usr_hook_flag++;
    }
}