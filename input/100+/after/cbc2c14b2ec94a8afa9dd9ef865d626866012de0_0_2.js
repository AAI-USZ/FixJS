function URIModule(Compose) {
	var NULL = null;
	var ARRAY_PROTO = Array.prototype;
	var OBJECT_PROTO = Object.prototype;
	var PUSH = ARRAY_PROTO.push;
	var TOSTRING = OBJECT_PROTO.toString;
	var TOSTRING_OBJECT = TOSTRING.call(OBJECT_PROTO);
	var TOSTRING_ARRAY = TOSTRING.call(ARRAY_PROTO);
	var TOSTRING_STRING = TOSTRING.call(String.prototype);
	var TOSTRING_FUNCTION = TOSTRING.call(Function.prototype);
	var RE_URI = /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?(?:([^?#]*)(?:\?([^#]*))?(?:#(.*))?)/;

	var PROTOCOL = "protocol";
	var AUTHORITY = "authority";
	var PATH = "path";
	var QUERY = "query";
	var ANCHOR = "anchor";

	var KEYS = [ "source",
		PROTOCOL,
		AUTHORITY,
		"userInfo",
		"user",
		"password",
		"host",
		"port",
		PATH,
		QUERY,
		ANCHOR ];

	// Store current Compose.secure setting
	var SECURE = Compose.secure;

	// Prevent Compose from creating constructor property
	Compose.secure = true;

	var Query = Compose(function Query(arg) {
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

		default:
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

	}, {
		toString : function toString() {
			var self = this;
			var key = NULL;
			var value = NULL;
			var values;
			var query = [];
			var i = 0;
			var j;

			for (key in self) {
				if (TOSTRING.call(self[key]) === TOSTRING_FUNCTION) {
					continue;
				}

				query[i++] = key;
			}

			query.sort();

			while (i--) {
				key = query[i];
				value = self[key];

				if (TOSTRING.call(value) === TOSTRING_ARRAY) {
					values = value.slice(0);

					values.sort();

					j = values.length;

					while (j--) {
						value = values[j];

						values[j] = value === ""
							? key
							: key + "=" + value;
					}

					query[i] = values.join("&");
				}
				else {
					query[i] = value === ""
						? key
						: key + "=" + value;
				}
			}

			return query.join("&");
		}
	});

	var Path = Compose(ARRAY_PROTO, function Path(arg) {
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
	}, {
		toString : function toString() {
			return this.join("/");
		}
	});

	var URI = Compose(function URI(str) {
		var self = this;
		var matches = RE_URI.exec(str);
		var i = matches.length;
		var value;

		while (i--) {
			value = matches[i];

			if (value) {
				self[KEYS[i]] = value;
			}
		}

		if (QUERY in self) {
			self[QUERY] = Query(self[QUERY]);
		}

		if (PATH in self) {
			self[PATH] = Path(self[PATH]);
		}
	}, {
		toString : function toString() {
			var self = this;
			var uri = [ PROTOCOL , "://", AUTHORITY, "/", PATH, "?", QUERY, "#", ANCHOR ];
			var i;
			var key;

			if (!(PROTOCOL in self)) {
				uri[0] = uri[1] = "";
			}

			if (!(AUTHORITY in self)) {
				uri[2] = uri[3] = "";
			}

			if (!(PATH in self)) {
				uri[3] = uri[4] = "";
			}

			if (!(QUERY in self)) {
				uri[5] = uri[6] = "";
			}

			if (!(ANCHOR in self)) {
				uri[7] = uri[8] = "";
			}

			i = uri.length;

			while (i--) {
				key = uri[i];

				if (key in self) {
					uri[i] = self[key];
				}
			}

			return uri.join("");
		}
	});

	// Restore Compose.secure setting
	Compose.secure = SECURE;

	URI.Path = Path;
	URI.Query = Query;

	return URI;
}