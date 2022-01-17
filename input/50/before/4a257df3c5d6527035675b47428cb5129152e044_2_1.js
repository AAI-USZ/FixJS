function(canvas) {
		if (canvas.getContext) {
			return canvas.getContext('2d');
		} else {
			alert("Your browser doesn't support the 'canvas' api.");
			throw "Browser doesn't support canvas api.";
		}
	}