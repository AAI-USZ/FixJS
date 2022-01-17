function(datafile, cb) {
		var xhr = new XMLHttpRequest();
		xhr.open("GET", datafile);
		xhr.onreadystatechange = function() {
			if(xhr.readyState === 4) {
				cb(xhr.responseText);
			}
		};
		xhr.send(null);
	}