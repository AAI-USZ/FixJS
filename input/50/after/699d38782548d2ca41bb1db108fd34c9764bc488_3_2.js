		get doKindleImport() {
			if(typeof(localStorage['doKindleImport']) == "undefined") {
				return false;
			} else {
				return toBool(localStorage['doKindleImport']);
			}
		},
