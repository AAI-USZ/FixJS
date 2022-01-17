function (personUuid, identifierType, location) {
        var patient = Ext.create('mUserStories.model.upPatientModel', {
            person: personUuid,
            identifiers: [{
                identifier: this.getPatientIdentifier().toString(),
                identifierType: identifierType,
                location: location,
                preferred: true
            }]
        });

        var PatientStore = Ext.create('mUserStories.store.upPatientStore')
        PatientStore.add(patient);
        //makes the post call for creating the patient
        PatientStore.sync();
        PatientStore.on('write', function () {
            console.log('------Patient Created successfully------');
            //After patient has been created, send the encounter data
            this.sendEncounterData(personUuid);
        }, this);
        
        Ext.getCmp('ext-formpanel-5').reset();
        
        this.doDownload();
        this.toPage(PAGES.PATIENT_LIST)
    }