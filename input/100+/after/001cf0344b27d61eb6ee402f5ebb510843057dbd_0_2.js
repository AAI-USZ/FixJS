function() {
	  if ($(this).find('option[value=""]').length == 0) {
		$(this).prepend($('<option value="">-- Aucun --</option>'));
	  }
	}