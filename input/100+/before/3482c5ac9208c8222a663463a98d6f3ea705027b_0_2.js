function (arg) {
        var active = Ext.getCmp('viewPort').getActiveItem();
        console.log(active);
        console.log(active.id);
        // console.log(Ext.getCmp('viewPort').getActiveItem().getActiveIndex());
        if (active.getActiveItem() === PAGES.LOGIN_SCREEN) {
            this.doLogin(arg)
        } else if (active.id === 'ext-panel-5') {
            this.doAdd('register',arg)
        } else if (active === 'ext-panel-6') {
            this.doAdd('reminder',arg)
        } else if (active === 'ext-panel-7') {
            this.doAdd('appointment',arg)
        } else if (active === 'ext-tabpanel-3') {
            
        } else if (active === PAGES.INBOX_VC) {
            
        }
    }