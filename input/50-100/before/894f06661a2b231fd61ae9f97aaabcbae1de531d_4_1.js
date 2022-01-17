function () {
		var patientsTitles = Ext.ComponentQuery.query('ListView #patientsWaiting');
		var len = patientsTitles.length;
		var patientWaitNumber = Ext.getStore('patientStore').getCount();
		var i;
		for(i=0;i<len;i++)
		{
			patientsTitles[i].setTitle(patientWaitNumber + ' Patients Waiting');
		}
    }