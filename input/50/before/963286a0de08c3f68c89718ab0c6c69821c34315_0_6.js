function ap_ext_triggerUSR() {
    if ($('.ap_ext').css('display') == "block") {
        ap_ext_refreshSubtab('usr');
    } else {
        ap_usr_hook_flag++;
    }
}