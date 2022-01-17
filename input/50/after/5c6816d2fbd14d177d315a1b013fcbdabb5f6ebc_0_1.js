function pass(name) {
			var o = Object.create(options);
			o.path = name;
			o.maxAge = clientMaxAge;
			o.root = dirPath;
			staticSend(req, res, next, o);
		}