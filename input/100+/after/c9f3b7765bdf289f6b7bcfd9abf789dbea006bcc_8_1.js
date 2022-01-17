function () {
        formp = this.getNewPatient().saveForm();
        if (formp.firstname && formp.lastname && formp.id && formp.bmi) {
            var patient = Ext.create('Screener.model.Patient');
            patient.set('firstname', formp.firstname);
            patient.set('lastname', formp.lastname);
            patient.set('id', formp.id);
            patient.set('doctorid', -1);
            patient.set('bmi', formp.bmi);
            Ext.getStore('patientStore').add(patient);
            this.totalPatients++;
            this.getNewPatient().reset();
            this.getNewPatient().hide();
            if (!this.patientView) {
                this.patientView = Ext.create('Screener.view.PatientView');
            }
            this.updatePatientsWaitingTitle();
        }
    }