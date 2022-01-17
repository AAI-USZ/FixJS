function() {
		var url = "http://domain.com/path/file/[0-$&].jpg";
		equal(Fuskr.IsFuskable(url), false);

		var url = "http://domain.com/path/file/[a-$&].jpg";
		equal(Fuskr.IsFuskable(url), false);
	}