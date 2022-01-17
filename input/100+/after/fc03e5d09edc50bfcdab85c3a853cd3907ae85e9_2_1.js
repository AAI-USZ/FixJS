function()
	{
		if(window.history.length > 1) {
			wot.warning.exit_mode = "back"; // note: don't change this string, there are code dependent on it
		} else {
			wot.warning.exit_mode = "leave";
		}
	}