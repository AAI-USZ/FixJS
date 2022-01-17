function (name) {
	return function (o) {
		return value(o)[name];
	};
}