function pointInPoly(point, poly) {
	for(var i = 0; i < poly.lines.length; i++) {
		var comRel = pointLineRel(poly.com, poly.lines[i]),
			pointRel = pointLineRel(point, poly.lines[i]);
		if (pointRel != comRel && pointRel != 0) {
			return false;
		}
	}
	return true;
}