function() {
		var url = "http://domain.com/path[0-9]/file.jpg";
		equal(Fuskr.IsFuskable(url), true);

		var url = "http://domain.com/path[a-z]/file.jpg";
		equal(Fuskr.IsFuskable(url), true);
	}