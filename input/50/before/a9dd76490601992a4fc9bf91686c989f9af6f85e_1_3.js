		get logging_enabled() {
			if(typeof(localStorage['FDGS_LOGGING_ENABLED']) == "undefined") {
				return true;
			} else {
				return toBool(localStorage['FDGS_LOGGING_ENABLED']); //switch to false when live!
			}
		},
