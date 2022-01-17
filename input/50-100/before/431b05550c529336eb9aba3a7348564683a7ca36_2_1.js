function(e) {

		if (e.keyCode == Event.KEY_RETURN) {

			chat.message('/join '+$('entered_channel').getValue());

			$('entered_channel').clear();

			chat.listWindow.hide(); // aka hide me

			return true;

		}

	}