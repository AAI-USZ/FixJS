function(orientation) {
		gyroscopeAPI.data.timestamp = new Date().getTime();
		gyroscopeAPI.data.alpha = orientation.alpha;
		gyroscopeAPI.data.beta = orientation.beta;
		gyroscopeAPI.data.gamma = orientation.gamma;
	}