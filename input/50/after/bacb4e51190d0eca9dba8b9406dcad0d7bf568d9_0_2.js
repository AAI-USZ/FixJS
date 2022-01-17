function(){
                        console.log('Syncing');
                        this.getidentifierstype(onlineStore.getAt(0).getData().uuid)
                        offlineStore.removeAll();
                        offlineStore.sync();
                    }