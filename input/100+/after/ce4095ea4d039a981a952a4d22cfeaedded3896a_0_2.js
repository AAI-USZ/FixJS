function() {

	//opens the form to add players
	$optionsButton.click(function() {
		if(($playerForm.is(':visible'))) {
			$(this).removeClass('neg');
			$(this).addClass('pos');
			$playerForm.hide();
			$playerList.find('.remove').addClass('switch');
		} else {
			$(this).removeClass('pos');
			$(this).addClass('neg');
			$playerForm.show();
			$playerList.find('.remove').removeClass('switch');
		}
		return false;
	});

}