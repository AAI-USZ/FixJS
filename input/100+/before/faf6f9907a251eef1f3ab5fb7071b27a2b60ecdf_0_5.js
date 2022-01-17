function(form, store, cfg) {
        var add = form.down('#add');
        if (add && !cfg.ignore.click){
            add.on('click', function(button, event, options){
                if (form.getForm().isValid()){
                    var v = form.getForm().getFieldValues();
                    var m = store.add(v);
                    for(var i=0;i<m.length;i++) m[i].phantom = true;
                    store.sync();
                }

            });
        }

        var upd = form.down('#update');
        if (upd && !cfg.ignore.click){
            upd.on('click', function(button, event, options){
                if (form.getForm().isValid()){
                    var v = form.getForm().getFieldValues(), //checkbox need all submit
                    m = form.getForm().getRecord();
                    if (!m) return;
                    m.set(v);
                    //m.setDirty();
                    store.sync();
                }
            });
        }

        var ref = form.down('#refresh');
        if (ref && !cfg.ignore.refresh){
            ref.on('click', function(button, event, options){
                var params = Ext.applyIf({refresh:true, docheck:true}, store.reloadParams);
                store.load({params:params});
            });
        }
    }