function(value, default_value) {
				return ENME.params[value] == undefined ? (default_value == null ? "" : default_value) : ENME.params[value];
			}