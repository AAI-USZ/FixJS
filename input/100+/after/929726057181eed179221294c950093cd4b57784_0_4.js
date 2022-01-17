function slideShowButton() {
		var button = $('<input>', {type: 'button', value: 'A', dir:'ltr'})
			.css({float: 'right', clear: 'right'})
			.click(function() {
				clearTimer();
				timer = setInterval(function(){currentGame.advance()}, 1000);
			});
		return button;
	}