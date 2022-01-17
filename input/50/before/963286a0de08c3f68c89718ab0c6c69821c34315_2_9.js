function exp_ext_triggerCHE() {
    if ($('.ki_expenses').css('display') == "block") {
        exp_ext_reload();
    } else {
        exp_che_hook_flag++;
    }
}