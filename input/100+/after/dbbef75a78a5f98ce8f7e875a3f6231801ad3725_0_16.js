function(sector,gridSize) {
	var planeResult = glidias.AABBPortalPlane.getPlaneResult(glidias.AABBPortalPlane.DIRECTIONS[this.direction],sector,gridSize);
	var p;
	var x = 0;
	var y = 0;
	var z = 0;
	var width = planeResult.width;
	var doorwayHeight = this.portals[0].height;
	var aboveDoorwayHeight = planeResult.height - doorwayHeight;
	var geom = sector.geom;
	var pos = planeResult.pos;
	var right = planeResult.right.getReverse();
	var baseOffset = pos.x * right.x + pos.y * right.y + pos.z * right.z;
	var down = planeResult.up;
	var a;
	var b;
	var INDEX_LOOKUP = glidias.AABBSector.INDICES_LOOKUP[this.direction];
	if(aboveDoorwayHeight > 0) {
		p = glidias.PlaneResult.getIdentity();
		x = pos.x + down.x * aboveDoorwayHeight;
		y = pos.y + down.y * aboveDoorwayHeight;
		z = pos.z + down.z * aboveDoorwayHeight;
		a = geom.addVertex(x,y,z);
		x += right.x * planeResult.width;
		y += right.y * planeResult.width;
		z += right.z * planeResult.width;
		b = geom.addVertex(x,y,z);
		geom.addFace([INDEX_LOOKUP[0],a,b,INDEX_LOOKUP[3]]);
	}
	this.portals.sort(function(a1,b1) {
		var a2 = right.x * a1.minX + right.y * a1.minY + right.z * a1.minZ;
		var b2 = right.x * b1.minX + right.y * b1.minY + right.z * b1.minZ;
		if(a2 < b2) return -1; else if(a2 == b2) return 0;
		return 1;
	});
	var len = this.portals.length;
	var portal;
	var c;
	var lastC = -99999999;
	var o;
	var m = 0;
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		portal = this.portals[i];
		c = portal.minX * right.x + portal.minY * right.y + portal.minZ * right.z;
		o = portal.maxX * right.x + portal.maxY * right.y + portal.maxZ * right.z;
		if(o < c) c = o;
		if(lastC > c) haxe.Log.trace("WRONG, shoudl be less!",{ fileName : "AABBPortalPlane.hx", lineNumber : 212, className : "glidias.AABBPortalPlane", methodName : "addFaces"});
		lastC = c;
		o = baseOffset < c?c - baseOffset:baseOffset - c;
		p = planeResult.clone();
		p.pos.x += m * right.x;
		p.pos.y += m * right.y;
		p.pos.z += m * right.z;
		p.pos.x += aboveDoorwayHeight * down.x;
		p.pos.y += aboveDoorwayHeight * down.y;
		p.pos.z += aboveDoorwayHeight * down.z;
		p.width = o - m;
		p.height = portal.height;
		if(!(p.width == 0 || p.height == 0)) p.addToGeometry(geom);
		m += o - m + portal.width;
	}
	portal = this.portals[len - 1];
	p = planeResult.clone();
	p.pos.x += m * right.x;
	p.pos.y += m * right.y;
	p.pos.z += m * right.z;
	p.pos.x += aboveDoorwayHeight * down.x;
	p.pos.y += aboveDoorwayHeight * down.y;
	p.pos.z += aboveDoorwayHeight * down.z;
	p.width = planeResult.width - m;
	p.height = portal.height;
	if(!(p.width == 0 || p.height == 0)) p.addToGeometry(geom);
}