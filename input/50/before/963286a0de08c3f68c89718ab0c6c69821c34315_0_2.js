function ap_ext_subtab_autoexpand() {
	ap_ext_activePanel  = $.cookie('ap_ext_activePanel_'+usr_ID);
    if (ap_ext_activePanel) {
        ap_ext_subtab_expand(ap_ext_activePanel);
    } else {
        ap_ext_subtab_expand(1);
    }
}