function () {
        var active = Ext.getCmp('viewPort').getActiveItem();
        if (active.id === 'ext-formpanel-5' || active === 'ext-panel-6' || active === 'ext-panel-7') {
            this.toPage(PAGES.ADD)
        } else {
            this.toPage(PAGES.PATIENT_LIST)
        }
        /*/ TODO: Best logic for returning to previous page - doReturn()
        // Hard coded in? Create a list of visited pages?
        if (arg === 'list') {
            this.doDownload();
            Ext.getCmp('viewPort').setActiveItem(PAGES.PATIENT_LIST)
        } else if (arg === 'add') {
            Ext.getCmp('viewPort').setActiveItem(PAGES.ADD)
        } else if (arg === 'res') {
            this.getResources();
            Ext.getCmp('viewPort').setActiveItem(PAGES.RESOURCES)
        }*/
    }