		get base_domain() {
			if(typeof(localStorage['FDGS_LOGGING_ENABLED']) == "undefined") {
				return true;
			} else {
				return localStorage['FDGS_BASE_DOMAIN'] || "findings.com";
			}
		},
