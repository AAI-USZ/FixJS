function() {
		var url = "http://domain[0-9].com/path/file.jpg";
		equal(Fuskr.IsFuskable(url), true);

		var url = "http://domain[a-z].com/path/file.jpg";
		equal(Fuskr.IsFuskable(url), true);
	}