function(newTarget,direction,version2) {
	if(version2 == null) version2 = false;
	var meNew = new glidias.AABBPortal();
	{
		meNew.minX = this.minX;
		meNew.minY = this.minY;
		meNew.minZ = this.minZ;
		meNew.maxX = this.maxX;
		meNew.maxY = this.maxY;
		meNew.maxZ = this.maxZ;
	}
	var len = this.points.length;
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		meNew.points[i] = this.points[i].clone();
	}
	meNew.points.reverse();
	meNew.width = this.width;
	meNew.height = this.height;
	meNew.target = newTarget;
	return meNew;
}