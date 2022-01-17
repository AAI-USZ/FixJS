function() {
		var url = "http://domain{2}another[0-9].com/path";
		equal(Fuskr.IsFuskable(url), true);
	}