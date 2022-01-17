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
        }, this);

        Ext.getCmp('first_reg').reset();
        Ext.getCmp('last_reg').reset();
        Ext.getCmp('phone_reg').reset();
        Ext.getCmp('village_reg').reset();
        Ext.getCmp('bday').reset();
        Ext.getCmp('reg_form').reset();
        helper.doDownload();
        Ext.getCmp('viewPort').setActiveItem(PAGES.PATIENT_LIST)
    }