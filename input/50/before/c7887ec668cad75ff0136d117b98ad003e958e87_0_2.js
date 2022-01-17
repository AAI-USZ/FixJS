function () {
        // TODO: make sure all information is uploaded
        // TODO: delete/save necessary information
        Ext.getCmp('location').reset();
        // return to login screen
        Ext.getCmp('viewPort').setActiveItem(PAGES.LOGIN_SCREEN)
    }