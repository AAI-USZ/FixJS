function() {
	var len = this.planes.length;
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		this.planes[i] = new glidias.Vec3(0,0,0,0);
	}
}