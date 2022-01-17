function () {
        if(!this.reloadInProgress && !pimcore.globalmanager.get("pimcore_reload_in_progress")) {
            return t("do_you_really_want_to_leave_the_editmode");
        }
    }