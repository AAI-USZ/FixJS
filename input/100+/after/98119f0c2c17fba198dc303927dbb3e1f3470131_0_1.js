function(button, e, options) {
        var form = this.getContactDetail(),
            record = form.getRecord(),
            values = form.getValues();

        if(record) { //if editing record
            record.set(values);
            record.save();

        } else { //if new record

            record = Ext.create('Payback.model.Person',values);

            Ext.getStore('People').add(record);
            Ext.getStore('People').sync();
        }

        //update summary
        this.getApplication().getController('Summary').updateSummary();

        //clear form
        this.getContactDetail().reset();

        //refresh debt panel dataview with any new data
        this.getMainView().getInnerItems()[1].down('dataview').refresh();

        //update url
        this.getApplication().getHistory().add(new Ext.app.Action({
            url: '/Prey'
        }), true);

        //set active item
        Ext.Viewport.setActiveItem(0);
    }