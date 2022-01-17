function() {
		gyroscopeAPI.watchID = setTimeout("gyroscopeObj.sample()", gyroscopeAPI.options.frequency);
	}