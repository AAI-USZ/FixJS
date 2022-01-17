function export_extension_triggerTSS() {
    if ($('.ki_export').css('display') == "block") {
        export_extension_reload();
    } else {
        xp_tss_hook_flag++;
    }
}