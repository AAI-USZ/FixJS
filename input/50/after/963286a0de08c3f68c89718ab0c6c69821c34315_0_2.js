function adminPanel_extension_subtab_autoexpand() {
	adminPanel_extension_activePanel  = $.cookie('adminPanel_extension_activePanel_'+userID);
    if (adminPanel_extension_activePanel) {
        adminPanel_extension_subtab_expand(adminPanel_extension_activePanel);
    } else {
        adminPanel_extension_subtab_expand(1);
    }
}