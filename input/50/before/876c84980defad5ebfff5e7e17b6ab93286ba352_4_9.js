function() {
		var url = "http://domain[0-9]another{0}.com/path/file.jpg";
		equal(Fuskr.IsFuskable(url), true);
	}