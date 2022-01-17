function (array, value) {
	var index = array.indexOf(value);
	if (index >=0) {
		array.splice(index, 1);
	}
	return value;
}