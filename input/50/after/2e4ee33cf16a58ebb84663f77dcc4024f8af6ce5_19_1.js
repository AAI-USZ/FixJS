function() {
		ok(true);
		// can introduce and delete globals in setup/teardown
		// without noglobals sounding the alarm
		delete x;
	}