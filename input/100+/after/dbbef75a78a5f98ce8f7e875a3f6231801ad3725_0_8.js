function(map,gridSize,wallMat,floorMat,ceilingMat) {
	if(floorMat == null) floorMat = wallMat;
	if(ceilingMat == null) ceilingMat = floorMat;
	var str = "";
	var mask;
	var sector;
	var uLen;
	var len = map.length;
	var pWalls;
	var p;
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		sector = map[i];
		str += "<div class=\"Mesh Object3D\">";
		str += glidias.AABBPortalPlane.getPlaneResult(glidias.AABBPortalPlane.UP.getReverse(),sector,gridSize).getHTML(ceilingMat);
		str += glidias.AABBPortalPlane.getPlaneResult(glidias.AABBPortalPlane.UP,sector,gridSize).getHTML(floorMat);
		mask = 0;
		pWalls = sector.portalWalls;
		uLen = pWalls.length;
		var _g1 = 0;
		while(_g1 < uLen) {
			var u = _g1++;
			p = pWalls[u];
			str += p.getHTML(sector,gridSize,wallMat);
			mask |= 1 << p.direction;
		}
		if((mask & 1) == 0) str += glidias.AABBPortalPlane.getPlaneResult(glidias.AABBPortalPlane.DIRECTIONS[0],sector,gridSize).getHTML(wallMat);
		if((mask & 4) == 0) str += glidias.AABBPortalPlane.getPlaneResult(glidias.AABBPortalPlane.DIRECTIONS[2],sector,gridSize).getHTML(wallMat);
		if((mask & 2) == 0) str += glidias.AABBPortalPlane.getPlaneResult(glidias.AABBPortalPlane.DIRECTIONS[1],sector,gridSize).getHTML(wallMat);
		if((mask & 8) == 0) str += glidias.AABBPortalPlane.getPlaneResult(glidias.AABBPortalPlane.DIRECTIONS[3],sector,gridSize).getHTML(wallMat);
		str += "</div>";
	}
	return str;
}