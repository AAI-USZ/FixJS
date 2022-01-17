function(button, event, options){
                if (form.getForm().isValid()){
                    var v = form.getForm().getFieldValues();
                    var m = store.add(v);
                    for(var i=0;i<m.length;i++) m[i].phantom = true;
                    store.sync();
                }

            }