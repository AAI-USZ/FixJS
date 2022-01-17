function() {
		var url = "http://domain[0-9].com/path";
		equal(Fuskr.IsFuskable(url), true);
	}