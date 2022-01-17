function(form, store, cfg) {
        var add = form.down('#add'),
            me = this;
        if (add && !cfg.ignore.click){
            add.on('click', function(button, event, options){
                if (form.getForm().isValid()){
                    var v = form.getForm().getFieldValues(),
                        cfm = me.getConfirmation(button, v, null, store, form);
                    //confirmation
                    if (cfm){
                        Ext.Msg.confirm(cfm.title, cfm.msg, function(btn){
                            if (btn == 'yes'){
                                var m = store.add(v);
                                for(var i=0;i<m.length;i++) m[i].phantom = true;
                                store.sync();
                            }else{//todo: reload?
                            }
                        });
                    }else{
                        var m = store.add(v);
                        for(var i=0;i<m.length;i++) m[i].phantom = true;
                        store.sync();
                    }
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
                    //confirmation
                    var cfm = me.getConfirmation(button, v, m, store);
                    if (cfm){
                        Ext.Msg.confirm(cfm.title, cfm.msg, function(btn){
                            if (btn == 'yes'){
                                m.set(v);
                                store.sync();
                            }else{//todo:
                            }
                        });
                    }else{
                        m.set(v);
                        //m.setDirty();
                        store.sync();
                    }
                }
            });
        }

        var ref = form.down('#refresh');
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