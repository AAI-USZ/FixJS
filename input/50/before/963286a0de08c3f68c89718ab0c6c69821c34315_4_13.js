function xp_ext_triggerCHE() {
    if ($('.ki_export').css('display') == "block") {
        xp_ext_reload();
    } else {
        xp_che_hook_flag++;
    }
}