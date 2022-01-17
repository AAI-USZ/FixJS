function(canvas) {
		// Determine if the canvas API is supported.
		if (Modernizr.canvas) {
			return canvas.getContext('2d');
		} else {
			alert("Your browser doesn't support the canvas api.");
			throw "Browser doesn't support canvas api.";
		}
	}