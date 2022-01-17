function (arg) {
        if (arg === 'menu') {
            Ext.getCmp('viewPort').setActiveItem(PAGES.ADD)
        } else if (arg === 'down') {
            Ext.Msg.confirm('', 'Sync all information?', function (resp) {
                if (resp === 'yes') {
                    // TODO: check for conflicts
                    // doDownload information in localStorage
                    this.doDownload();
                // doUpload all information
                }
            },this)
        } else if (arg === 'inbox') {
            Ext.getCmp('viewPort').setActiveItem(PAGES.INBOX_CHW)
        } else if (arg === 'resources') {
            Ext.getCmp('viewPort').setActiveItem(PAGES.RESOURCES)
        } else if (arg === 'not') {
            Ext.getCmp('viewPort').setActiveItem(PAGES.INBOX_VC)
        } else if (arg === 'sch') {
            Ext.getCmp('viewPort').setActiveItem(PAGES.SCHEDULING)
        }
    }