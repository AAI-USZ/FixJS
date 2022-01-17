function (arg) {
        if (arg) {
            var active = Ext.getCmp('viewPort').getActiveItem();
            if (active.getActiveItem()===PAGES.loginScreen) {
                this.doList('familyList');
                Ext.getCmp('viewPort').setActiveItem(PAGES.familyList)
            }else if(active.getActiveItem()===PAGES.familyList){
                this.doList('familyDetails')
                Ext.getCmp('viewPort').setActiveItem(PAGES.familyDetails)
            }
        }
    }