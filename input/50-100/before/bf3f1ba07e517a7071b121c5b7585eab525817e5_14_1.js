function (args, resolve) {
	var result;
	if (this.failed) {
		return resolve(this.promise);
	}
	try {
		result = reduce.call(args, function (obj, key) {
			return value(obj)[String(key)];
		}, this.value);
	} catch (e) {
		return resolve(e);
	}
	return resolve(result);
}