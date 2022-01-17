		get disable_caching() {
			if(typeof(localStorage['disable_caching']) == "undefined") {
				return false;
			} else {
				return toBool(localStorage['disable_caching']);
			}
		},
