function() {
		var url = "http://domain.com/path/file/{0}another[0-9].jpg";
		equal(true, Fuskr.IsFuskable(url));
	}