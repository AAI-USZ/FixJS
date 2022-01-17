function() {
		window.removeEventListener("deviceorientation", gyroscopeAPI.onSuccess);
		clearTimeout(gyroscopeAPI.watchID);
		console.log("gyroscope.watch stopped");
	}