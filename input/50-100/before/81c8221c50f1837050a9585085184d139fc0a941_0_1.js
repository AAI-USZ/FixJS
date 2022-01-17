function(key) {
	var keys = key.split(/\./);
	var field = keys.pop();
	var data = Echo.Utils.getNestedValue(this.data, keys);
	Echo.Utils.setNestedValue(this.cache, key, undefined);
	delete data[field];
}