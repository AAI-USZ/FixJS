function (key) {
		var spec_symbols = '`~!@#$%^&*()_+1234567890-=[{]}\\|;:\'"",<.>/?';

		$('.highlighted').removeClass('highlighted');

		if (key == ' ') {
			$('.c32').addClass('highlighted');
			return;
		}
		if ( spec_symbols.indexOf(key) == -1 ) {
			if (key == key.toUpperCase()) {
				$('.c16').addClass('highlighted');
				key = key.toLowerCase();
			}
		}
		for (var i in Buttons) {
			if (key == Buttons[i].innerText) {
				$(Buttons[i]).addClass('highlighted');
			}
		}
	}