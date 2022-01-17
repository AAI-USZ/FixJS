function () {
        var patientsTitles = Ext.ComponentQuery.query('ListView #patientsWaiting');
        var patientWaitNumber = Ext.getStore('patientStore').getCount();
        var i;
        for (i = 0; i < patientsTitles.length; i++) {
            patientsTitles[i].setTitle(patientWaitNumber + ' Patients Waiting');
        }
    }