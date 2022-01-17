function() {
		if (!$(this).hasClass('inactive')) {
			disableButtons();
			$('#Element_OphDrPrescription_Details_draft').val(0);
			return true;
		}
		return false;
	}