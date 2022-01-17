function() {
		window.removeEventListener("deviceorientation", gyroscopeAPI.onSuccess);
		clearTimeout(gyroscopeAPI.watchID);
		consoleLog.add("gyroscope.watch stopped");
	}