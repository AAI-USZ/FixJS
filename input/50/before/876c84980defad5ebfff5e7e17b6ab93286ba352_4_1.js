function() {
		var url = "http://domain.com/path/file/[0-$&].jpg";
		equal(Fuskr.IsFuskable(url), false);
	}