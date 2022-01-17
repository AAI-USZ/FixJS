function(x, y, w, h, r){
	var p = new RoundPanel({
		x : x || 0, y : y || 0, width : w || 100, height : h || 100, round : r || 10
	});
	p.ownerDocument = this;
	return p;
}