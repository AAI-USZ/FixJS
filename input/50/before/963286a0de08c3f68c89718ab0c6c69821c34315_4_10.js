function xp_ext_triggerTSS() {
    if ($('.ki_export').css('display') == "block") {
        xp_ext_reload();
    } else {
        xp_tss_hook_flag++;
    }
}