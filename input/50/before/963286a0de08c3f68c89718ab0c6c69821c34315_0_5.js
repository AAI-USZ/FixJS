function ap_ext_triggerCHE() {
    if ($('.ap_ext').css('display') == "block") {
        ap_ext_refreshSubtab('evt');
    } else {
        ap_che_hook_flag++;
    }
}