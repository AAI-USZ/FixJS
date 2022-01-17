function (arg) {
        if (arg === 'menu') {
            Ext.getCmp('viewPort').setActiveItem(PAGES.ADD)
        } else if (arg === 'sync') {
            Ext.Msg.confirm('', 'Sync all information?', function (resp) {
                if (resp === 'yes') {
                    // TODO: check for conflicts             
                    // doUpload all information
                    
                    var onlineStore = Ext.create('mUserStories.store.upPersonStore');
                    var offlineStore = Ext.getStore('offlineRegisterStore')
                    onlineStore.on('write',function(){
                        console.log('Syncing');
                        this.getidentifierstype(onlineStore.getAt(0).getData().uuid)
                    },this);
                    
                    offlineStore.each(function(record){
                        record.phantom = true;
                        onlineStore.add(record);
                        
                        console.log(offlineStore.getNewRecords());
                        console.log(offlineStore.getUpdatedRecords());
                        console.log(offlineStore.getRemovedRecords());
                        
                        onlineStore.sync();
                        
                    },this);
                    this.doDownload();
                    offlineStore.removeAll();
                    offlineStore.sync();
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