function exp_ext_triggerTSS() {
    if ($('.ki_expenses').css('display') == "block") {
        exp_ext_reload();
    } else {
        exp_tss_hook_flag++;
    }
}