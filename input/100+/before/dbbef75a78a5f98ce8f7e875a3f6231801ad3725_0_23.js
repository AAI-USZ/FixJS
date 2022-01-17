function(s) {
	var a = new Array();
	{
		var _g1 = 0, _g = s.length;
		while(_g1 < _g) {
			var i = _g1++;
			var c = s.cca(i);
			if(c <= 127) a.push(c);
			else if(c <= 2047) {
				a.push(192 | c >> 6);
				a.push(128 | c & 63);
			}
			else if(c <= 65535) {
				a.push(224 | c >> 12);
				a.push(128 | c >> 6 & 63);
				a.push(128 | c & 63);
			}
			else {
				a.push(240 | c >> 18);
				a.push(128 | c >> 12 & 63);
				a.push(128 | c >> 6 & 63);
				a.push(128 | c & 63);
			}
		}
	}
	return new haxe.io.Bytes(a.length,a);
}