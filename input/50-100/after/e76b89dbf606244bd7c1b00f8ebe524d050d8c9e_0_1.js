function(e) {
		if (e.keyCode == 13) {
			if (doodle = magic.getDoodle('PhakoIncision')) {
				if (doodle.getParameter('incisionMeridian') != $(this).val()) {
					doodle.setParameterWithAnimation('incisionMeridian',$(this).val());
					magic.followSurgeon = false;
				}
			}
			return false;
		}
	}