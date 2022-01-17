function xp_ext_triggerCHP() {
    if ($('.ki_export').css('display') == "block") {
        xp_ext_reload();
    } else {
        xp_chp_hook_flag++;
    }
}