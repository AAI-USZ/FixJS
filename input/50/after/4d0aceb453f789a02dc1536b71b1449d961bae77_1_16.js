function () {
        // TODO: make sure all information is uploaded
        // TODO: delete/save necessary information
        // Ext.getCmp('location').reset();
        // return to login screen
        USER.name = '';
        USER.uuid = '';
        this.toPage(PAGES.LOGIN_SCREEN)
    }