function(button, event, options){
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
            }