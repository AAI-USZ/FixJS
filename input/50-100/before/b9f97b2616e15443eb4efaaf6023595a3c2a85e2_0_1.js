function(error) {
		OpenMEAP.doToast("An error occurred checking for an update\n\n"+error.type+':'+error.message);
	}