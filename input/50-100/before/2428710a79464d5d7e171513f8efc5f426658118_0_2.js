function (arg) {
        // TODO: Best logic for returning to previous page - doReturn()
        // Hard coded in? Create a list of visited pages?
        if (arg === 'list') {
            helper.doDownload();
            Ext.getCmp('viewPort').setActiveItem(PAGES.PATIENT_LIST)
        } else if (arg === 'add') {
            Ext.getCmp('viewPort').setActiveItem(PAGES.ADD)
        }
    }