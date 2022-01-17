function (uuid, encountertype, location, provider) {
        //funciton to get the date in required format of the openMRS, since the default extjs4 format is not accepted
        var currentDate = new Date();
        // creates the encounter json object
        var jsonencounter = Ext.create('Screener.model.encounterpost', {
            encounterDatetime: Util.Datetime(currentDate, 5.5),
            patient: uuid, //you will get the uuid from ticket 144...pass it here
            encounterType: encountertype,
            //location: location,
            provider: provider
        });
        // the 3 fields "encounterDatetime, patient, encounterType" are obligatory fields rest are optional
        var store = Ext.create('Screener.store.encounterpost');
        store.add(jsonencounter);
        store.sync();
        store.on('write', function () {
            Ext.getStore('patientStore').load();
        }, this)
        return store
    }