function () {
        if (!ctlr) {
            ctlr = Application.getController('dispense');
        }
        if (!secondCtlr) {
            secondCtlr = Application.getController('prescription');

        }

        if (!store) {
            store = Application.getStore('dispense');
        }
        if (!secondStore) {
            secondStore = Ext.create('RaxaEmr.Pharmacy.store.Patients');
        }

        if (!view) {
            view = Ext.create('Ext.Container', {
                items: [{
                    xtype: 'Dispense',
                    title: 'Drug Dispense in this package'

                }, {
                    xtype: 'addPatient'

                }]
            });
        }


        expect(store).toBeTruthy()
        waitsFor(

            function () {
                return !store.isLoading();
            }, "load never completed", TIMEOUT)
        Ext.getCmp('givenName').setValue('Raxa');
        Ext.getCmp('familyName').setValue('Jss');
        Ext.getCmp('age').setValue(20);
        Ext.getCmp('block').setValue('Hauz Khas Village');
        Ext.getCmp('village').setValue('Delhi');
        Ext.getCmp('District').setValue('South Delhi');

    }