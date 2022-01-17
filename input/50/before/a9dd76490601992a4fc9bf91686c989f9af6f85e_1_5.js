		get disabled_caching() {
			if(typeof(localStorage['FDGS_DISABLE_CACHING']) == "undefined") {
				return false;
			} else {
				return toBool(localStorage['FDGS_DISABLE_CACHING']);
			}
		},
