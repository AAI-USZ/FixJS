function(o, iterator, context) {
	// we must account for null, otherwise it will throw the error "Unable to get value of the property 'length': object is null or undefined"
	if (!o) {
		return o;
	}
	var n, i = 0, l = o.length, k;
	// objects and functions iterate through the keys
	if (l === undefined || isFunction(o)) {
		k = keys(o);
		l = k.length;
		for (n = o[k[0]]; i < l; n = o[k[++i]]) {
			if (iterator.call(context || n, n, k[i], o) === false) {
				break;
			}
		}
	} else {
		// loops are iterated with the for i statement
		for (n = o[0]; i < l; n = o[++i]) {
			if (iterator.call(context || n, n, i, o) === false) {
				break;
			}
		}
	}
	return o;
}