function(event) {
		var tempCanvas = document.getElementsByTagName("CANVAS")[0];
		var cam = gbox.getCamera();
		
		if (navigator.userAgent.match(/Firefox/i)) {
			mouse.x = (event.layerX - tempCanvas.offsetLeft)/gbox._zoom + cam.x;
			mouse.y = (event.layerY - tempCanvas.offsetTop)/gbox._zoom + cam.y;
		}
		else if (navigator.userAgent.match(/Chrome/i)) {
			mouse.x = event.layerX/gbox._zoom + cam.x;
			mouse.y = event.layerY/gbox._zoom + cam.y;
		}
		else {
			// This is the same as the chrome code
			mouse.x = event.layerX/gbox._zoom + cam.x;
			mouse.y = event.layerY/gbox._zoom + cam.y;
		}
	}