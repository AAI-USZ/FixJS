function(button, event, options){
                var records = grid.getSelectionModel().getSelection();
                //store = this.down('gridpanel').store;
                store.remove(records);
                store.sync({operation:{debug:'abc'}});
            }