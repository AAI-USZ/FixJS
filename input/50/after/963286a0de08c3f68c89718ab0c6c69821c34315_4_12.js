function export_extension_triggerCHP() {
    if ($('.ki_export').css('display') == "block") {
        export_extension_reload();
    } else {
        xp_chp_hook_flag++;
    }
}