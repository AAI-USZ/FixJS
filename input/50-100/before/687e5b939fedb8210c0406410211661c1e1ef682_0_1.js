function() {

		this.patientPrescriptionStore.removeAll();
		this.patientsLabsOrdersStore.removeAll();
		var doctorsNoteBody = this.query('[action="body"]')[0];
		doctorsNoteBody.reset();


	}