function(newTarget,ox,oy,oz) {
	if(oz == null) oz = 0;
	if(oy == null) oy = 0;
	if(ox == null) ox = 0;
	var meNew = new glidias.AABBPortal();
	{
		meNew.minX = 1.7976931348623157e+308;
		meNew.minY = 1.7976931348623157e+308;
		meNew.minZ = 1.7976931348623157e+308;
		meNew.maxX = -1.7976931348623157e+308;
		meNew.maxY = -1.7976931348623157e+308;
		meNew.maxZ = -1.7976931348623157e+308;
	}
	meNew.width = this.width;
	meNew.height = this.height;
	meNew.target = newTarget;
	var mePoints = [];
	var len = this.points.length;
	var p;
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		p = this.points[i];
		p = new glidias.Vec3(p.x,p.y,p.z,p.w);
		p.x += ox;
		p.y += oy;
		p.z += oz;
		mePoints[i] = p;
		glidias.AABBUtils.expand(p.x,p.y,p.z,meNew);
	}
	meNew.points = mePoints;
	meNew.points.reverse();
	return meNew;
}