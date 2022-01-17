function(button, e, options) {

        var form = this.getDebtDetail(),
            record = form.getRecord(),
            values = form.getValues(),
            person = this.getDebtDetail().down('selectfield').record; //gets person from selectfield

            values.amount = (values.amount)?values.amount.toFixed(2):0;


        if(record) { //edit old record

            //sets values from form into record
            record.set(values);

            //if the person is changed in the record
            if (record.isModified('person_id')) {
                record.getPerson().debts().remove(record); //remove debts from old
                record.setPerson(values.person_id); //sets new

                // The following two lines work around a bug that causes the Person instance not to be updated correctly
                delete record.PersonBelongsToInstance;
                record.getPerson(); // bug, Sets up the Person instance reference again
            }

            record.set('balance',0); //setting the balance calls the convert field again to update the debt

            //record.commit(); //bug in the framework(now fixed), saving a record does not remove modified flags

            record.save();

        } else {  //new record 
            var debt = person.debts().add(values)[0]; //add values
            person.debts().sync();
            debt.getPerson(); //bug in the framework(reported as TOUCH-3073), this associates the debt with the person in the store

            //bug in the framework(now fixed), this allows the dataview to update the list when a record is added the first time and no other are in the store
            //debt.save({
            //    callback:function(){
            //        this.getMyDebtDataView().refresh();
            //    }
            //},this);

        }

        //calc balance for the person
        person.calcBalance();

        //load data into debt store from localStorage
        Ext.getStore('Debts').load();

        //update people store
        Ext.getStore('People').load(function(){
            this.getApplication().getController('Summary').updateSummary();
        },
        this);

        //refresh debt panel dataview with any new data
        this.getMainView().getInnerItems()[1].down('dataview').refresh();

        //update url
        this.getApplication().getHistory().add(new Ext.app.Action({
            url: '/Debt'
        }), true);

        //set active item
        Ext.Viewport.setActiveItem(this.prevPanel);
    }