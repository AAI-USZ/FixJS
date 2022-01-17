function(e) {
		// If the page still exist
		if (self !== null)
			method(e.detail, caller, e);
	}