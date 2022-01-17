function (arg) {
        if (arg === 'menu') {
            Ext.getCmp('viewPort').setActiveItem(PAGES.ADD)
        } else if (arg === 'sync') {
            Ext.Msg.confirm('', 'Sync all information?', function (resp) {
                if (resp === 'yes') {
                    // TODO: check for conflicts
                    // doDownload information in localStorage
                    this.doDownload();
                    // doUpload all information
                    var up_store = Ext.create('mUserStories.store.upPersonStore');
                    var offlineRegStore = Ext.getStore('offlineRegisterStore');
                    //copy all data from offlineRegStore to up_store
                    offlineRegStore.each(function (record){
                        up_store.add(record);
                        up_store.sync();
                    });
                    up_store.on('write', function () {
                        console.log('Stored locally, calling identifier type');
                        // Now that Person is created, send request to create Patient
                        this.getidentifierstype(up_store.getAt(0).getData().uuid)
                    }, this)
                    //Empty out the offlineStore
                }
            },this)
        } else if (arg === 'inbox') {
            Ext.getCmp('viewPort').setActiveItem(PAGES.INBOX_CHW)
        } else if (arg === 'resources') {
            this.getResources();
            Ext.getCmp('viewPort').setActiveItem(PAGES.RESOURCES)
        } else if (arg === 'not') {
            Ext.getCmp('viewPort').setActiveItem(PAGES.INBOX_VC)
        } else if (arg === 'sch') {
            Ext.getCmp('viewPort').setActiveItem(PAGES.SCHEDULING)
        }
    }