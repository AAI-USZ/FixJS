function(item){
                        var fp = new this.FP({
                            closable:true,
                            title:nls.npFilesystemAction,
                            gridStore:this.gridStore,
                            treeStore:this.treeStore
                        });
                        var fpc = new this.FPC({
                            view:fp
                        })
                        
                        this.adminDialog.addChild(fp);
                        fp.resize();
                        
                    }