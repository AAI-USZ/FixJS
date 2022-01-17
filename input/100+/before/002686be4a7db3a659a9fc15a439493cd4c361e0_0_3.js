function checkBlock(square, stateLine) {
	for(var i = 0; i < square.edges.length; i++) {
		var p = linesIntersect(square.edges[i], stateLine)
		if(p != null)
			return p;
	}
}