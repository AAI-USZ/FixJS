function(collider) {
	var sphere = collider.sphere;
	var timestamp = collider.timestamp;
	this.collisionId = timestamp;
	if(sphere.x + sphere.w > this.minX && sphere.x - sphere.w < this.maxX && sphere.y + sphere.w > this.minY && sphere.y - sphere.w < this.maxY && sphere.z + sphere.w > this.minZ && sphere.z - sphere.w < this.maxZ) {
		collider.geometries.push(this.geom);
		var len = this.portalWalls.length;
		var port;
		var p;
		var ptl;
		var pl;
		var portal;
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			p = this.portalWalls[i];
			ptl = p.portals;
			pl = ptl.length;
			var _g1 = 0;
			while(_g1 < pl) {
				var u = _g1++;
				portal = ptl[u];
				if(sphere.x + sphere.w > p.minX && sphere.x - sphere.w < p.maxX && sphere.y + sphere.w > p.minY && sphere.y - sphere.w < p.maxY && sphere.z + sphere.w > p.minZ && sphere.z - sphere.w < p.maxZ) {
					port = portal.target;
					if(port == null) continue;
					if(port.collisionId != timestamp && (sphere.x + sphere.w > port.minX && sphere.x - sphere.w < port.maxX && sphere.y + sphere.w > port.minY && sphere.y - sphere.w < port.maxY && sphere.z + sphere.w > port.minZ && sphere.z - sphere.w < port.maxZ)) {
					}
				}
			}
		}
	}
}