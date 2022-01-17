function(button, event, options){
                if (form.getForm().isValid()){
                    var v = form.getForm().getFieldValues(), //checkbox need all submit
                    m = form.getForm().getRecord();
                    if (!m) return;
                    m.set(v);
                    //m.setDirty();
                    store.sync();
                }
            }