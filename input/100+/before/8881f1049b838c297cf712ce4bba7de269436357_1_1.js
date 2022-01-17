function () {
        // TODO: why doesn't the list refresh when using back button?
        this.doList('familyList');
        Ext.getCmp('viewPort').setActiveItem(PAGES.familyList)
    }