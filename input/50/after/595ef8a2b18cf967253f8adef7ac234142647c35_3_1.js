function (name) {
	return function (obj) {
		delete value(obj)[name];
	};
}, { resolvers: [String] }