function () {
        currentNumPatients = Ext.getStore('Doctors').getAt(this.currentDoctorIndex).get('numpatients') + 1;
        Ext.getStore('Doctors').getAt(this.currentDoctorIndex).set('numpatients', currentNumPatients);
        Ext.getStore('Patients').getAt(this.currentPatientIndex).set('patientid', this.currentDoctorIndex);
        console.log(Ext.getStore('Doctors'))
        var patient = Ext.getStore('Patients').getAt(this.currentPatientIndex).data.uuid
        var provider = Ext.getStore('Doctors').getAt(this.currentDoctorIndex).data.person.uuid
        //Ext.getStore('patientStore').removeAt(this.currentPatientIndex);
        this.getPatientList().deselectAll();
        this.getDoctorList().deselectAll();
        this.getAssignButton().disable();
        this.sendEncounterData(patient, localStorage.screenerUuidencountertype, localStorage.waitingUuidlocation, provider)
    }