function() {
		gyroscopeAPI.watchID = setTimeout("gyroscopeAPI.executeCBs()", gyroscopeAPI.options.frequency);
		//execute onSuccess callback functions
		for(i=0;i<gyroscopeAPI.successCBs.length;i++) {
			gyroscopeAPI.successCBs[i](gyroscopeAPI.data);
		}
	}