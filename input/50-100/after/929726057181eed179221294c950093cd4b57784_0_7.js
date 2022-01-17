function advanceButton() {
		var button = $('<input>', {type: 'button', value: '=>', dir:'ltr'})
			.css({float: 'right', clear: 'right'})
			.click(function() {
				clearTimer();
				currentGame.advance();
			});
		return button;
	}