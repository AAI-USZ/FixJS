function export_extension_triggerCHE() {
    if ($('.ki_export').css('display') == "block") {
        export_extension_reload();
    } else {
        xp_che_hook_flag++;
    }
}