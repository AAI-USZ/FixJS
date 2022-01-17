function() {
		if(($playerForm.is(':visible'))) {
			$(this).removeClass('neg');
			$(this).addClass('pos');
			$playerForm.hide();
		} else {
			$(this).removeClass('pos');
			$(this).addClass('neg');
			$playerForm.show();
		}
		return false;
	}