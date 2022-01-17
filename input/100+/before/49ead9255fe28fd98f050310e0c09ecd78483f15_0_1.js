function (resp) {
                if (resp === 'yes') {
                    // TODO: check for conflicts             
                    // doUpload all information
                    
                    var onlineStore = Ext.create('mUserStories.store.upPersonStore');
                    var offlineStore = Ext.getStore('offlineRegisterStore')
                    onlineStore.on('write',function(){
                        console.log('Syncing');
                        this.getidentifierstype(onlineStore.getAt(0).getData().uuid)
                        offlineStore.removeAll();
                        offlineStore.sync();
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
                    Ext.getCmp('patientlistid').reset();
                }
            }