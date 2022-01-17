function jsonifyObjectsInArray(array) {
	for (var i = array.length - 1; i >= 0; i--) {
		var item = array[i];
		if (item && '[object Object]' === item.toString()) {
			array[i] = JSON.stringify(item);
		}
	}
}