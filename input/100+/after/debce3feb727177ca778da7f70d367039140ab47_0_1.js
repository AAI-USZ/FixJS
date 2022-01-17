function (button) {

        var win = button.up('window'),
            form = win.down('form').getForm(),
            record = form.getRecord(),
            values = form.getValues();
       
        if (!form.isValid()) {
            return;
        };

        record.set(values);

        // check if this is a newly created record and insert into the store
        if (record.phantom) {
            this.getChildrenStore().insert(0, record);
        }

        win.close();

        // save to the server
        this.getChildrenStore().sync();
    }