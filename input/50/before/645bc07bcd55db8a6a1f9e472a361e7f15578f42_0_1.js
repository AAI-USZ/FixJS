function() {
		window.addEventListener("deviceorientation", this.onSuccess);
		gyroscopeAPI.watchID = setTimeout("gyroscopeObj.sample()", gyroscopeAPI.options.frequency);
		consoleLog.add("gyroscope.watch started");
	}