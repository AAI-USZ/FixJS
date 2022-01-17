		get logging_enabled() {
			if(typeof(localStorage['logging_enabled']) == "undefined") {
				return true;
			} else {
				return toBool(localStorage['logging_enabled']); //switch to false when live!
			}
		},
