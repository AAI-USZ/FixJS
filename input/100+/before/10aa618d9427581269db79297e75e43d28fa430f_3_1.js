function () {
        formp = this.getNewPatient().saveForm();
        if (formp.firstname && formp.lastname && formp.id) {
            var patient = Ext.create('starter.model.Patient');
            patient.set('firstname', formp.firstname);
            patient.set('lastname', formp.lastname);
            patient.set('id', formp.id);
            patient.set('doctorid', -1);
            Ext.getStore('patientStore').add(patient);
            this.totalPatients++;
            this.getNewPatient().reset();
            this.getNewPatient().hide();
        }
    }