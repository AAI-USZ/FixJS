function (arg) {
        var active = Ext.getCmp('viewPort').getActiveItem().getActiveItem();
        if (active === PAGES.LOGIN_SCREEN) {
            this.doLogin(arg)
        } else if (active === PAGES.ADD_REG) {
            this.doAdd('reg',arg)
        } else if (active === PAGES.ADD_REM) {
            this.doAdd('rem',arg)
        } else if (active === PAGES.ADD_APP) {
            this.doAdd('app',arg)
        } else if (active === PAGES.INBOX_CHW) {
            
        } else if (active === PAGES.INBOX_VC) {
            
        }
    }