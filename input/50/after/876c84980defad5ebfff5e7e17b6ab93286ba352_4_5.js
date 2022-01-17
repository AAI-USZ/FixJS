function() {
		var url = "http://domain.com/path[0-9]";
		equal(Fuskr.IsFuskable(url), true);

		var url = "http://domain.com/path[a-z]";
		equal(Fuskr.IsFuskable(url), true);
	}