function euclidDist(p1, p2) {
	var xd = p1.x-p2.x, yd = p1.y-p2.y;
	return Math.sqrt(xd*xd + yd*yd);
}