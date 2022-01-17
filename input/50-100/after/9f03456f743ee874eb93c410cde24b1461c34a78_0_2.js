function(len) {
	var l = len == null?1:len;
	var output = [];
	var _g = 0;
	while(_g < l) {
		var k = _g++;
		output.push(tools.Random.Number(100) + 0.0);
	}
	return output;
}