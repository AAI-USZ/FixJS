function (name) {
	return function (o) {
		return value(o)[name];
	};
}, { length: 1, resolvers: [String] }