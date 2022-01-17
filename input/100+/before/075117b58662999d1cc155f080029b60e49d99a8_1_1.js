function (key) {

		$('.highlighted').removeClass('highlighted');

		if (key == ' ') {
			$('.c32').addClass('highlighted');
			return;
		}
		if (key == key.toUpperCase()) {
			$('.c16').addClass('highlighted');
			key = key.toLowerCase();
		}

		for (var i in Buttons) {
			if (key == Buttons[i].innerText) {
				$(Buttons[i]).addClass('highlighted');
			}
		}
	}