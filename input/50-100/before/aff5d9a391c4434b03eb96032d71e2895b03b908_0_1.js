function(x, y, r){
	var p = new Circle({
		x : x || 0, y : y || 0, radio : r || 50
	});
	p.ownerDocument = this;
	return p;
}