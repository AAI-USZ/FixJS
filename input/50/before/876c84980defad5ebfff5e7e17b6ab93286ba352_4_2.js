function() {
		var url = "http://domain.com/path/file/[0-9].jpg";
		equal(Fuskr.IsFuskable(url), true);
	}