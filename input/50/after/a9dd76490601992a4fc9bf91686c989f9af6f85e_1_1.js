		get base_domain() {
			if(typeof(localStorage['base_domain']) == "undefined") {
				return "findings.com";
			} else {
				return localStorage['base_domain'];
			}
		},
