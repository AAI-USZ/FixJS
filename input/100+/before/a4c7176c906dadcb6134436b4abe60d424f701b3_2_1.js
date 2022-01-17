function () {
        var loginState = Ext.getCmp('mainView').getActiveItem()._activeItem;
        if (loginState === 0) {
            Util.logoutUser();
        }
        return loginState;
    }