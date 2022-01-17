function(map,gridSize) {
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
		sector.geom.addFace(glidias.AABBSector.INDICES_LOOKUP[5]);
		sector.geom.addFace(glidias.AABBSector.INDICES_LOOKUP[4]);
		mask = 0;
		pWalls = sector.portalWalls;
		uLen = pWalls.length;
		var _g1 = 0;
		while(_g1 < uLen) {
			var u = _g1++;
			p = pWalls[u];
			p.addFaces(sector,gridSize);
			mask |= 1 << p.direction;
		}
		if((mask & 1) == 0) sector.geom.addFace(glidias.AABBSector.INDICES_LOOKUP[0]);
		if((mask & 4) == 0) sector.geom.addFace(glidias.AABBSector.INDICES_LOOKUP[2]);
		if((mask & 2) == 0) sector.geom.addFace(glidias.AABBSector.INDICES_LOOKUP[1]);
		if((mask & 8) == 0) sector.geom.addFace(glidias.AABBSector.INDICES_LOOKUP[3]);
	}
}