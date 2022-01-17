function createPolygon(ps) {
	var ls = new Array(ps.length);
	var sumx = 0, sumy = 0, total = ps.length;
	
	for(var i = 0; i < total-1; i++) {
		sumx += ps[i].x;
		sumy += ps[i].y;
		ls[i] = createLine(ps[i], ps[i+1]);
	}
	ls[total-1] = createLine(ps[total-1], ps[0]);
	sumx += ps[total-1].x;
	sumy += ps[total-1].y;
	
	return {
		lines:ls,
		points:ps,
		com:{x:sumx/total,y:sumy/total}
	};
}