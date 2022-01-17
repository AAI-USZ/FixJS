function(a) {
	var side = 1;
	var planes = this.planes;
	var len = planes.length;
	var minX = a.minX;
	var minY = a.minY;
	var minZ = a.minZ;
	var maxX = a.maxX;
	var maxY = a.maxY;
	var maxZ = a.maxZ;
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		var plane = planes[i];
		if(plane.x >= 0) {
			if(plane.y >= 0) {
				if(plane.z >= 0) {
					if(maxX * plane.x + maxY * plane.y + maxZ * plane.z <= plane.w) return false;
				} else if(maxX * plane.x + maxY * plane.y + minZ * plane.z <= plane.w) return false;
			} else if(plane.z >= 0) {
				if(maxX * plane.x + minY * plane.y + maxZ * plane.z <= plane.w) return false;
			} else if(maxX * plane.x + minY * plane.y + minZ * plane.z <= plane.w) return false;
		} else if(plane.y >= 0) {
			if(plane.z >= 0) {
				if(minX * plane.x + maxY * plane.y + maxZ * plane.z <= plane.w) return false;
			} else if(minX * plane.x + maxY * plane.y + minZ * plane.z <= plane.w) return false;
		} else if(plane.z >= 0) {
			if(minX * plane.x + minY * plane.y + maxZ * plane.z <= plane.w) return false;
		} else if(minX * plane.x + minY * plane.y + minZ * plane.z <= plane.w) return false;
		side <<= 1;
	}
	return true;
}