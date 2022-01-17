function(button, e, options) {
        var form = this.getContactDetail(),
            record = form.getRecord(),
            values = form.getValues();

        //validate
        var isValid = function(record) {
            var errors = record.validate();

            if(errors.isValid())// || record.get('email') === "")
            return true;
            else {
                Ext.Msg.alert('Error', 'Invalid Email address', Ext.emptyFn);
                return false;
            }

        };

        if(record) { //if editing record
            record.set(values);

            //validate
            // if(!isValid(record))
            //    return;

            record.save();

            //bug in framework(not a bug, dataview just needs to be refreshed with new data),
            //if (record.isModified('name')) {
            //    Ext.getStore('Debts').removeAll();  these two lines update the debts with the new person name.
            //    Ext.getStore('Debts').load();
            //}

        } else { //if new record

            record = Ext.create('Payback.model.Person',values);

            //validate
            // if(!isValid(record)) 
            //    return;

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