function(item){
                        var fp = new this.FP({
                            gridStore:this.gridStore,
                            treeStore:this.treeStore
                        });
                        var fpc = new this.FPC({
                            view:fp
                        })
                        
                        this.adminDialog.addChild(fp);
                        fp.resize();
                        
                    }