function() {
		var req = new XMLHttpRequest();
		req.open("POST", "non-existant-page", false);
		req.send();
	}