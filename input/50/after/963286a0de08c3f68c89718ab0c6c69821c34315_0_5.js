function adminPanel_extension_triggerCHE() {
    if ($('.adminPanel_extension').css('display') == "block") {
        adminPanel_extension_refreshSubtab('activities');
    } else {
        ap_che_hook_flag++;
    }
}