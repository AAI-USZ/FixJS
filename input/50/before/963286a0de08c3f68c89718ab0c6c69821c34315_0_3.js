function ap_ext_triggerCHK() {
    if ($('.ap_ext').css('display') == "block") {
        ap_ext_refreshSubtab('knd');
        ap_ext_refreshSubtab('pct');
    } else {
        ap_chk_hook_flag++;
    }
}