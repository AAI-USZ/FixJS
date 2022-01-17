function()
	{
		// try to understand in which environment we are run
		var user_agent = window.navigator.userAgent || "";
		wot.env.is_mailru = user_agent.indexOf("MRCHROME") >= 0;

		if(wot.env.is_mailru) {
			// set param to label requests
			wot.partner = "mailru";
		}

		wot.prefs.set("partner", wot.partner);
	}