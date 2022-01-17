function(grid, store, cfg, binder) {
        var sm = grid.getSelectionModel();
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
                var records = grid.getSelectionModel().getSelection();
                //store = this.down('gridpanel').store;
                store.remove(records);
                store.sync({operation:{debug:'abc'}});
            });
        }

        var ref = grid.down('#refresh');
        if (ref && !cfg.ignore.refresh){
            ref.on('click', function(button, event, options){
                var params = Ext.applyIf({refresh:true, docheck:true}, store.reloadParams);
                store.load({params:params});
            });
        }
    }