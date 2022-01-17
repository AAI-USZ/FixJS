function (store_regEncounter, store_scrEncounter, store_outEncounter) {
        var store_patientList = Ext.create('Screener.store.PatientList', {
            storeId: 'patientStore'
        });
        var store_assPatientList = Ext.create('Screener.store.AssignedPatientList', {
            storeId: 'assPatientStore'
        })
        // Setting the url dynamically for store to store patients list
        store_patientList.getProxy().setUrl(this.getPatientListUrl(store_regEncounter.getData().getAt(0).getData().uuid, store_scrEncounter.getData().getAt(0).getData().uuid, localStorage.regUuidencountertype));
        store_assPatientList.getProxy().setUrl(this.getPatientListUrl(store_scrEncounter.getData().getAt(0).getData().uuid, store_outEncounter.getData().getAt(0).getData().uuid, localStorage.screenerUuidencountertype));
        store_patientList.load();
        store_assPatientList.load();
        store_patientList.on('load', function () {}, this);
        return store_patientList;
    }