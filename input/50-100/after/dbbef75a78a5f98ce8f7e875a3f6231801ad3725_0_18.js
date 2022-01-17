function(direction) {
	var len = this.portalWalls.length;
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		if(this.portalWalls[i].direction == direction) return this.portalWalls[i];
	}
	return null;
}