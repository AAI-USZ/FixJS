function (resp) {
                if (resp === 'yes') {
                    // TODO: check for conflicts             
                    // doUpload all information
                    var up_store = Ext.create('mUserStories.store.upPersonStore');
                    var offlineRegStore = Ext.getStore('offlineRegisterStore');
                    up_store.removeAll();
                    //copy all data from offlineRegStore to up_store
                    offlineRegStore.each(function (record){
                        up_store.add(record);
                        console.log(up_store);
                        up_store.sync();
                        console.log('added to up_store')
                        up_store.on('write', function () {
                            console.log('Stored locally, calling identifier type');
                            // Now that Person is created, send request to create Patient
                            this.getidentifierstype(up_store.getAt(0).getData().uuid)
                        }, this);
                        
                    });
                    //Empty out the offlineStore
                    offlineRegStore.removeAll();
                    
                    console.log('removed from offline and up store');
                    this.doDownload();
                    console.log('download complete');
                }
            }