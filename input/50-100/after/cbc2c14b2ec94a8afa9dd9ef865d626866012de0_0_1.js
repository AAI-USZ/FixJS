function Path(arg) {
		if (!arg || arg.length === 0) {
			return;
		}

		var self = this;
		var matches;
		var re = /(?:\/|^)([^\/]*)/g;

		switch (TOSTRING.call(arg)) {
			case TOSTRING_ARRAY:
				PUSH.apply(self, arg);
				break;

			default:
				while (matches = re.exec(arg)) {
					PUSH.call(self, matches[1]);
				}
				break;
		}
	}