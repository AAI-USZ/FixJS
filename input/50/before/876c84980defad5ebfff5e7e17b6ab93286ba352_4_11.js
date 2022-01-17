function() {
		var url = "http://domain.com/path{0}another[0-9]/file.jpg";
		equal(Fuskr.IsFuskable(url), true);
	}