function() {
		var url = "http://domain.com/path{4}another[0-9]";
		equal(Fuskr.IsFuskable(url), true);
	}