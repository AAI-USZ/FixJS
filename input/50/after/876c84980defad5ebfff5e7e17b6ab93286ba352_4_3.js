function() {
		var url = "http://domain.com/path/file/[0-45[.jpg";
		equal(Fuskr.IsFuskable(url), false);

		var url = "http://domain.com/path/file/[a-z[.jpg";
		equal(Fuskr.IsFuskable(url), false);
	}