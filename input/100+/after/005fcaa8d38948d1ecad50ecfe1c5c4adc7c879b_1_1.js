function() {

        // set this here as a global so that eg. the editmode can access this (edit::iframeOnbeforeunload()),
        // to prevent multiple warning messages to be shown
        pimcore.globalmanager.add("pimcore_reload_in_progress", true);

        if(!pimcore.settings.devmode) {
            // check for opened tabs and if the user has configured the warnings
            var tabPanel = Ext.getCmp("pimcore_panel_tabs");
            var user = pimcore.globalmanager.get("user");
            if(pimcore.settings.showCloseConfirmation && tabPanel.items.getCount() > 0 && user["closeWarning"]) {
                return t("do_you_really_want_to_close_pimcore");
            }
        }
    }