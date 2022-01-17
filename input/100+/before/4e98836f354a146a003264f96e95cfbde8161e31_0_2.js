function(object, callback) {
	if (!object) return;
	var key, i = 0,
		length = object.length;
	
	if (length === undefined || Object.prototype.toString.call(object) == '[object Function]') {
		for (key in object) {
			callback.call(object[key], key, object[key]);
		}
	} else {
		for (; i < length;) {
			callback.call(object[i], i, object[i++]);
		}
	}
}