function () {
        var jsonperson = Ext.create('RaxaEmr.Pharmacy.model.Person', {
            gender: Ext.getCmp('sexRadioGroup').getChecked()[0].boxLabel.charAt(0),
            addresses: [{
                    address1: Ext.getCmp('block').value,
                    cityVillage: Ext.getCmp('village').value,
                    countyDistrict: Ext.getCmp('District').value
                }],
            names: [{
                    givenName: Ext.getCmp('givenName').value,
                    familyName: Ext.getCmp('familyName').value
                }]
        })
        //this if else statement change the persist property of age field in Person model so that if its
        //empty it should not be sent to server in the body of post call
        if (Ext.getCmp('age').isValid()) {
            jsonperson.data.age = Ext.getCmp('age').value;
            RaxaEmr.Pharmacy.model.Person.getFields()[2].persist = true;
        } else {
            RaxaEmr.Pharmacy.model.Person.getFields()[2].persist = false;
        }
        if (Ext.getCmp('dob').isValid()) {
            jsonperson.data.birthdate = Ext.getCmp('dob').value;
            RaxaEmr.Pharmacy.model.Person.getFields()[3].persist = true;
        } else {
            RaxaEmr.Pharmacy.model.Person.getFields()[3].persist = false;
        }

        var store = Ext.create('RaxaEmr.Pharmacy.store.Persons');
        store.add(jsonperson);
        // this statement makes the post call to make the person
        store.sync();
        // this statement calls getifentifiers() as soon as the post call is successful
        store.on('write', function () {
            this.getidentifierstype(store.getAt(0).getData().uuid)
        }, this)
        Ext.getCmp('addPatient').getForm().reset();
        //I made this funtion return this store because i needed this in jasmine unit test
        return store;
    }