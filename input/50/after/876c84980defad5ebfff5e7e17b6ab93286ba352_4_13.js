function() {
		var url = "http://domain.com/path/file[0-9]another{0}.jpg";
		equal(Fuskr.IsFuskable(url), true);

		var url = "http://domain.com/path/file[a-z]another{0}.jpg";
		equal(Fuskr.IsFuskable(url), true);
	}