function(dir,sector,gridSize) {
	var south = glidias.AABBPortalPlane.DIRECTIONS[2];
	var east = glidias.AABBPortalPlane.DIRECTIONS[3];
	var upwards = glidias.AABBPortalPlane.UP;
	var rect = sector.rect;
	var planeResult = new glidias.PlaneResult();
	dir = new glidias.Vec3(dir.x,dir.y,dir.z,dir.w);
	var p;
	var x;
	var y;
	var z;
	var b;
	var dirId;
	if((p = dir.x * south.x + dir.y * south.y + dir.z * south.z) != 0) {
		dirId = p < 0?0:2;
	}
	else if((p = dir.x * east.x + dir.y * east.y + dir.z * east.z) != 0) {
		dirId = p < 0?1:3;
	}
	else {
		if(!((p = dir.x * upwards.x + dir.y * upwards.y + dir.z * upwards.z) != 0)) haxe.Log.trace("Assumption failed for final dot up/down",{ fileName : "AABBPortalPlane.hx", lineNumber : 75, className : "glidias.AABBPortalPlane", methodName : "getPlaneResult"});
		dirId = p < 0?5:4;
	}
	var b1 = glidias.AABBPortalPlane.OFFSET_BITMASKS[dirId];
	var up;
	var right = glidias.AABBPortalPlane.UP.crossProduct(dir);
	if(right.x * right.x + right.y * right.y + right.z * right.z == 0) {
		right = dir.crossProduct(glidias.AABBPortalPlane.DIRECTIONS[2]);
		up = right.crossProduct(glidias.AABBPortalPlane.UP);
	}
	else {
		up = glidias.AABBPortalPlane.UP.getReverse();
	}
	planeResult.up = up;
	planeResult.right = right;
	planeResult.look = dir;
	if(dirId == 4 || dirId == 5) {
		planeResult.width = rect.width * gridSize;
		planeResult.height = rect.height * gridSize;
	}
	else {
		planeResult.width = dirId == 3 || dirId == 1?rect.height * gridSize:rect.width * gridSize;
		planeResult.height = sector.ceilHeight;
	}
	p = (rect.x + ((b1 & 1) != 0?rect.width:0)) * gridSize;
	x = east.x * p;
	y = east.y * p;
	z = east.z * p;
	p = (rect.y + ((b1 & 2) != 0?rect.height:0)) * gridSize;
	x += south.x * p;
	y += south.y * p;
	z += south.z * p;
	p = sector.groundPos + sector.ceilHeight - ((b1 & 4) != 0?sector.ceilHeight:0);
	x += upwards.x * p;
	y += upwards.y * p;
	z += upwards.z * p;
	planeResult.pos = new glidias.Vec3(x,y,z);
	return planeResult;
}