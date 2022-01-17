function () {
        Ext.getStore('patientStore').load();
        Ext.getStore('patientStore').on('load', function () {
            patientUpdate.updatePatientsWaitingTitle();
            patientUpdate.setBMITime(Ext.getStore('patientStore'));
        });
    }