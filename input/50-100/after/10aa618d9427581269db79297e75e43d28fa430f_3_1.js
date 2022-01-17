function () {
        if (!this.patientView) {
            this.patientView = Ext.create('Screener.view.PatientView');
        }
        this.getDoctorList().deselectAll();
        this.getView().push(this.patientView);
        this.updatePatientsWaitingTitle();
        setInterval(this.updatePatientsWaitingTitle, Util.UITIME);
    }