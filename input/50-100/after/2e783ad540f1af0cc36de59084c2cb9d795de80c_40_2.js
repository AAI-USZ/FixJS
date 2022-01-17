function () {
        if (Ext.getCmp('doctorSummary')) {
            Ext.getCmp('doctorSummary').hide();
        }
        if (!this.patientView) {
            this.patientView = Ext.create('Screener.view.PatientView');
        }
        // this.getDoctorList().deselectAll();
        this.getView().push(this.patientView);
		patientUpdate.updatePatientsWaitingTitle();
        this.countPatients();
    }