function (ob, string) {
	var output = {}, propList = string.split(','), i;
	for (i = 0; i < propList.length; i += 1) {
		output[propList[i]] = ob[propList[i]];
	}
	return output;
}