function(button, event, options){
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
            }