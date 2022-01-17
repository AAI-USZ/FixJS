function () {
        if (!this.patientSummary) {
            this.patientSummary = Ext.create('Screener.view.PatientSummary');
        }
        Ext.Viewport.add(this.patientSummary);
        Ext.getCmp('patientSummary').setHidden(false);
    }