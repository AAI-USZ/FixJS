function (resp) {
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
            }