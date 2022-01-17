function () {
        if (!ctlr) {
            ctlr = App.getController('Application');
        }
        if (!view) {
            view = Ext.create('Screener.view.NewPatient');

            //mocking ajax call with Jasmine Spies
            Ext.getCmp("givenName").setValue('Raxa');
            Ext.getCmp("familyName").setValue('Jss');
            Ext.getCmp('ext-radiofield-1').check();
        }
        if (!store) {
            store = Ext.create('Screener.store.NewPersons');
        }
    }