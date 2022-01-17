function() {
                    var form = this.up('formpanel');
                    console.log(form);
                    var store = Ext.getStore('itemStore');
                    var values = form.getValues();
                    if(values.itemID > 0) {
                        var index = store.find('itemID', values.itemID);
                        var record = store.getAt(index);
                        record.set(values);
                    } else {
                        var record = Ext.ModelMgr.create(form.getValues(), 'CatHerder.model.Item');
                    }
                    record.save();
                    var tabs = this.up('tabpanel');
                    var current = tabs.getActiveItem();
                    console.log(current);
                    current.setActiveItem(0);
                }