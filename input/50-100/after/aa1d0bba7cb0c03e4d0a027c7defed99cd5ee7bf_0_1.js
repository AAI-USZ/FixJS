function (arg) {
        if (arg) {
            var active = Ext.getCmp('viewPort').getActiveItem();
            if (active.getActiveItem()===PAGES.loginScreen) {
                this.doList('familyList');
                Ext.getCmp('viewPort').setActiveItem(PAGES.familyList)
            }
        }
    }