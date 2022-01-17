function createPolygon(ps) {
	var ls = new Array(ps.length);
	
	for(var i = 0; i < ps.length-1; i++) {
		ls[i] = createLine(ps[i], ps[i+1]);
	}
	ls[ps.length-1] = createLine(ps[ps.length-1], ps[0]);
	
	return {
		lines:ls,
		points:ps
	};
}