function(button, e, options) {

        var store = this.down('gridpanel').store;
        if (this.getForm().isValid()){
            var v = this.getForm().getFieldValues();
            store.add(v);
            store.sync();
        }

    }