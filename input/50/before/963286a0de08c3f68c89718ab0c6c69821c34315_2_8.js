function exp_ext_triggerCHP() {
    if ($('.ki_expenses').css('display') == "block") {
        exp_ext_reload();
    } else {
        exp_chp_hook_flag++;
    }
}