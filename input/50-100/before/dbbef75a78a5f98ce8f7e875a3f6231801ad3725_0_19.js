function() {
	var arr = [];
	{
		var _g1 = 0, _g = this.portalWalls.length;
		while(_g1 < _g) {
			var i = _g1++;
			var portalPlane = this.portalWalls[i];
			var portals = portalPlane.portals;
			{
				var _g3 = 0, _g2 = portals.length;
				while(_g3 < _g2) {
					var u = _g3++;
					arr.push(portals[u]);
				}
			}
		}
	}
	return arr;
}