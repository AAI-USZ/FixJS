function export_extension_triggerCHK() {
    if ($('.ki_export').css('display') == "block") {
        export_extension_reload();
    } else {
        xp_chk_hook_flag++;
    }
}