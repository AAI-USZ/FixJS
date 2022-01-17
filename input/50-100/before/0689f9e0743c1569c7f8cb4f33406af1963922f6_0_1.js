function(button, event, options){
                if (form.getForm().isValid()){
                    var v = form.getForm().getFieldValues(true),
                        m = form.getForm().getRecord();
                    if (!m) return;
                    for(var e in v) m.set(e, v[e]);
                    store.sync();
                }
            }