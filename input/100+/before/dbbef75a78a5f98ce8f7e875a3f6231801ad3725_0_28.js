function(camPos,buffer,frus,visibleSectors,renderId) {
	this.dom.style.visibility = "visible";
	this.renderId = renderId;
	visibleSectors.arr[visibleSectors.i++] = this;
	var p;
	var ptl;
	var pl;
	var cp;
	var portal;
	var len = this.portalWalls.length;
	var port;
	var cFrus;
	{
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			p = this.portalWalls[i];
			if(frus.checkVisibility(p)) {
				ptl = p.portals;
				pl = ptl.length;
				{
					var _g1 = 0;
					while(_g1 < pl) {
						var u = _g1++;
						portal = ptl[u];
						if(frus.checkVisibility(portal)) {
							port = portal.target;
							if(port == null) continue;
							if(port.renderId != renderId) {
								cFrus = (buffer._i < buffer._len?buffer._vec[buffer._i++]:buffer._vec[buffer._len++] = buffer._method()).setup4FromPortal(camPos.x,camPos.y,camPos.z,portal.points,null);
								cFrus.planes[4] = frus.planes[4];
								cFrus.planes[5] = frus.planes[5];
								port.checkVis(camPos,buffer,cFrus,visibleSectors,renderId);
							}
						}
					}
				}
			}
		}
	}
}