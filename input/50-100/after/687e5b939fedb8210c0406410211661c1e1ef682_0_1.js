function() {
        var doctorsNoteBody = this.query('[action="body"]')[0],
            template = this.query('[action="template"]')[0];
		this.patientPrescriptionStore.removeAll();
		this.patientsLabsOrdersStore.removeAll();

		doctorsNoteBody.reset();
		template.reset();


	}