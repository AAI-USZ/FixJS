function() {
		window.addEventListener("deviceorientation", gyroscopeAPI.onSuccess);
		gyroscopeAPI.watchID = setTimeout("gyroscopeAPI.executeCBs()", gyroscopeAPI.options.frequency);
		console.log("gyroscope.watch started");
	}