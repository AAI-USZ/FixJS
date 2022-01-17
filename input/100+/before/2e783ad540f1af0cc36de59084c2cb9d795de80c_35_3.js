function (personUuid, identifierType, location) {
        localStorage.setItem('uuid',personUuid)
        console.log(personUuid)
        var patient = Ext.create('Registration.model.patient', {
            person: personUuid,
            identifiers: [{
                identifier: Util.getPatientIdentifier().toString(),
                identifierType: identifierType,
                location: location,
                preferred: true
            }]
        });
        Ext.getCmp('bmiPatientID').setValue(patient.getData().identifiers[0].identifier);
        var PatientStore = Ext.create('Registration.store.patient')
        PatientStore.add(patient);
        //makes the post call for creating the patient
        PatientStore.sync();
        //I made this funtion return this store because i needed this in jasmine unit test
        PatientStore.on('load', function () {
            var l = Ext.getCmp('mainRegArea').getLayout();
            l.setActiveItem(REG_PAGES.REG_BMI.value); 
        }, this)
        return PatientStore;
        
        
    }