function pass(name) {
			var o = Object.create(options);
			o.path = name;
			o.maxAge = clientMaxAge;
			staticSend(req, res, next, o);
		}