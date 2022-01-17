function(callback) {
        var me = this,
	        billingPanel = me.query('[action="balance"]')[0],
	        demographicsPanel = me.query('[action="demoFormPanel"]')[0];

        if(me.checkIfCurrPatient()) {
            var patient = me.getCurrPatient();
	        me.updateTitle(patient.name + ' - #' + patient.pid + ' (Patient Summary)');

	        ACL.hasPermission('access_demographics',function(provider, response){
		        if (response.result){
			        demographicsPanel.show();
	                me.getFormData(demographicsPanel);
		        }else{
			        demographicsPanel.hide();
		        }

	        });



	        me.getPatientImgs();


	        Fees.getPatientBalance({pid:app.currPatient.pid},function(balance){
		        billingPanel.body.update('Account Balance: $' + balance);
	        });
	        me.patientNotesStore.load({params: {pid: app.currPatient.pid}});
	        me.patientRemindersStore.load({params: {pid: app.currPatient.pid}});
	        me.immuCheckListStore.load({params: {pid: app.currPatient.pid}});
	        me.patientAllergiesListStore.load({params: {pid: app.currPatient.pid}});
	        me.patientMedicalIssuesStore.load({params: {pid: app.currPatient.pid}});
	        me.patientSurgeryStore.load({params: {pid: app.currPatient.pid}});
	        me.patientDentalStore.load({params: {pid: app.currPatient.pid}});
	        me.patientMedicationsStore.load({params: {pid: app.currPatient.pid}});
	        me.patientDocumentsStore.load({params: {pid: app.currPatient.pid}});

	        me.encounterEventHistoryStore.load({params: {pid: app.currPatient.pid}});

            me.verifyPatientRequiredInfo();

            app.PreventiveCareWindow.loadPatientPreventiveCare();


        } else {
            callback(false);
            me.currPatientError();
        }
    }