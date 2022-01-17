function(button, event, options){
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
            }