function(e) {
		if (e.keyCode == 13) {
			if (doodle = magic.getDoodle('PhakoIncision')) {
				if (parseFloat($(this).val()) > 9.9) {
					$(this).val(9.9);
				} else if (parseFloat($(this).val()) < 0.1) {
					$(this).val(0.1);
				}
				doodle.setParameterWithAnimation('incisionLength',$(this).val());
			}
			return false;
		}
	}