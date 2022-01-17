function exp_ext_triggerCHK() {
    if ($('.ki_expenses').css('display') == "block") {
        exp_ext_reload();
    } else {
        exp_chk_hook_flag++;
    }
}