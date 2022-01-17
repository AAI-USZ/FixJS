function xp_ext_triggerCHK() {
    if ($('.ki_export').css('display') == "block") {
        xp_ext_reload();
    } else {
        xp_chk_hook_flag++;
    }
}