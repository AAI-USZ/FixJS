function(grid, store, cfg, binder) {
        var sm = grid.getSelectionModel(),
            me = this;
        //don't override designed behavior.
        if (sm && !cfg.ignore.selectionchange){
            grid.on('selectionchange', function(grid, selections, options){
                if (selections.length>=1 && this.down('#delete')){
                    this.down('#delete').enable();
                }else{
                    this.down('#delete').disable();
                }
            });
        }

        var del = grid.down('#delete');
        if (del && !cfg.ignore['delete']){
            del.on('click', function(button, event, options){
                var records = grid.getSelectionModel().getSelection(),
                    cfm = me.getConfirmation(button, null, records, store);
                if (cfm){
                    Ext.Msg.confirm(cfm.title, cfm.msg, function(btn){
                        if (btn == 'yes'){
                            //store = this.down('gridpanel').store;
                            store.remove(records);
                            store.sync({operation:{debug:'abc'}});
                        }else{//todo:
                        }
                    });
                }else{
                    store.remove(records);
                    store.sync();
                }
            });
        }

        var ref = grid.down('#refresh');
        if (ref && !cfg.ignore.refresh){
            ref.on('click', function(button, event, options){
                var params = Ext.applyIf({refresh:true, docheck:true}, store.reloadParams),
                    cfm = me.getConfirmation(button, null, null, store);
                if (cfm){
                    Ext.Msg.confirm(cfm.title, cfm.msg, function(btn){
                        if (btn == 'yes'){
                            store.load({params:params});
                        }else{//todo:
                        }
                    });
                }else{
                    store.load({params:params});
                }
            });
        }
    }