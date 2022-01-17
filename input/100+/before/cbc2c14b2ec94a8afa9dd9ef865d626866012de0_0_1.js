function Query(arg) {
		var self = this;
		var matches;
		var key = NULL;
		var value;
		var re = /(?:&|^)([^&=]*)=?([^&]*)/g;

		switch (TOSTRING.call(arg)) {
		case TOSTRING_OBJECT:
			for (key in arg) {
				self[key] = arg[key];
			}
			break;

		case TOSTRING_STRING:
			while (matches = re.exec(arg)) {
				key = matches[1];

				if (key in self) {
					value = self[key];

					if (TOSTRING.call(value) === TOSTRING_ARRAY) {
						value[value.length] = matches[2];
					}
					else {
						self[key] = [ value, matches[2] ];
					}
				}
				else {
					self[key] = matches[2];
				}
			}
			break;
		}

	}