function () {
        currentNumPatients = Ext.getStore('doctorStore').getAt(this.currentDoctorIndex).get('numpatients') + 1;
        Ext.getStore('doctorStore').getAt(this.currentDoctorIndex).set('numpatients', currentNumPatients);
        var provider = Ext.getStore('doctorStore').getAt(this.currentDoctorIndex).data.uuid
        Ext.getStore('doctorStore').getAt(this.currentDoctorIndex).patients().add(Ext.getStore('patientStore').getAt(this.currentPatientIndex));
        Ext.getStore('patientStore').getAt(this.currentPatientIndex).set('patientid', this.currentDoctorIndex);
        var patient = Ext.getStore('patientStore').getAt(this.currentPatientIndex).data.uuid
        //Ext.getStore('patientStore').removeAt(this.currentPatientIndex);
        this.getPatientList().deselectAll();
        this.getDoctorList().deselectAll();
        this.getAssignButton().disable();
        this.getProviderUuid(provider,patient)
    }