function(orientation) {
		gyroscopeAPI.data.timestamp = new Date().getTime();
		gyroscopeAPI.data.alpha = orientation.alpha;
		gyroscopeAPI.data.beta = orientation.beta;
		gyroscopeAPI.data.gamma = orientation.gamma;
		
		//execute onSuccess callback functions
		for(i=0;i<gyroscopeAPI.successCBs.length;i++) {
			gyroscopeAPI.successCBs[i](gyroscopeAPI.data);
		}
	}