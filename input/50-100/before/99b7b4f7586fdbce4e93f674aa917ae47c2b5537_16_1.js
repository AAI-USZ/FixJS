function (button, e, options) {
        Util.logoutUser();
        var logconfirm = Ext.getCmp('LogoutConfirmPanelID');
        logconfirm.hide();
    }