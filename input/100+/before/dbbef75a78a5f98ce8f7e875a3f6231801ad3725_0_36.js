function(camPos,camFrus,sectors) {
	this.renderId++;
	this.frustumStack._i = 0;
	var arr = this.sectorStack.arr;
	var len = this.sectorStack.i;
	{
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			arr[i].dom.style.visibility = "hidden";
		}
	}
	var s = this.curSector;
	if(s == null) {
		s = this.getCurrentSector(camPos,sectors);
		if(s == null) {
			return;
		}
		this.curSector = s;
	}
	else {
		if(!!(camPos.x < s.minX || camPos.y < s.minY || camPos.z < s.minZ || camPos.x > s.maxX || camPos.y > s.maxY || camPos.z > s.maxZ)) {
			s = this.getCurrentSector(camPos,sectors);
			if(s != null && this.curSector != s) {
				this.curSector = s;
			}
		}
	}
	this.sectorStack.i = 0;
	this.curSector.checkVis(camPos,this.frustumStack,camFrus,this.sectorStack,this.renderId);
}