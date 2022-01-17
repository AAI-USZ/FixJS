function ap_ext_triggerCHP() {
    if ($('.ap_ext').css('display') == "block") {
        ap_ext_refreshSubtab('pct');
    } else {
        ap_chp_hook_flag++;
    }
}