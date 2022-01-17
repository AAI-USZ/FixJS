function () {
        if (!ctlr) {
            ctlr = Application.getController('dispense');
        }

        if (!store) {
            store = Application.getStore('dispense');
        }
        if (!view) {
            view = Ext.create('Ext.Container', {
                items: [{
                    xtype: 'Dispense',
                    title: 'Drug Dispense in this package'

                }]
            });
        }

        expect(store).toBeTruthy()
        waitsFor(

        function () {
            return !store.isLoading();
        }, "load never completed", TIMEOUT
        //4000
        )
       // console.log(view)
    }