function(map,gridSize) {
	var mask;
	var sector;
	var uLen;
	var len = map.length;
	var pWalls;
	var p;
	{
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			sector = map[i];
			mask = 0;
			pWalls = sector.portalWalls;
			uLen = pWalls.length;
			{
				var _g1 = 0;
				while(_g1 < uLen) {
					var u = _g1++;
					p = pWalls[u];
					if(p.direction == 0) p.addFaces(sector,gridSize);
				}
			}
		}
	}
}