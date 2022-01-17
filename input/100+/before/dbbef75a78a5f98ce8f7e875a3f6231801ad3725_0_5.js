function(target,door,gridSize,doorWidth,doorHeight,groundPos) {
	this.target = target;
	this.height = doorHeight;
	this.width = doorWidth;
	var south = glidias.AABBPortalPlane.DIRECTIONS[2];
	var east = glidias.AABBPortalPlane.DIRECTIONS[3];
	var up = glidias.AABBPortalPlane.UP;
	var dir = glidias.AABBPortalPlane.getDoorDir(door);
	var sx = door.x;
	var sy = door.y;
	var reverse = dir == 0 || dir == 1;
	if(reverse) {
		if(dir == 1) {
			sx += 1;
		}
		else {
			sy += 1;
		}
	}
	{
		this.minX = 1.7976931348623157e+308;
		this.minY = 1.7976931348623157e+308;
		this.minZ = 1.7976931348623157e+308;
		this.maxX = -1.7976931348623157e+308;
		this.maxY = -1.7976931348623157e+308;
		this.maxZ = -1.7976931348623157e+308;
	}
	var px;
	var py;
	var pz;
	var p;
	p = sy * gridSize;
	px = south.x * p;
	py = south.y * p;
	pz = south.z * p;
	p = sx * gridSize;
	px += east.x * p;
	py += east.y * p;
	pz += east.z * p;
	p = groundPos + doorHeight;
	px += up.x * p;
	py += up.y * p;
	pz += up.z * p;
	this.points.push(new glidias.Vec3(px,py,pz,1));
	{
		if(px < this.minX) this.minX = px;
		if(py < this.minY) this.minY = py;
		if(pz < this.minZ) this.minZ = pz;
		if(px > this.maxX) this.maxX = px;
		if(py > this.maxY) this.maxY = py;
		if(pz > this.maxZ) this.maxZ = pz;
	}
	p = sy * gridSize;
	px = south.x * p;
	py = south.y * p;
	pz = south.z * p;
	p = sx * gridSize;
	px += east.x * p;
	py += east.y * p;
	pz += east.z * p;
	p = groundPos;
	px += up.x * p;
	py += up.y * p;
	pz += up.z * p;
	this.points.push(new glidias.Vec3(px,py,pz,1));
	{
		if(px < this.minX) this.minX = px;
		if(py < this.minY) this.minY = py;
		if(pz < this.minZ) this.minZ = pz;
		if(px > this.maxX) this.maxX = px;
		if(py > this.maxY) this.maxY = py;
		if(pz > this.maxZ) this.maxZ = pz;
	}
	if((dir & 1) != 0) {
		sy += 1;
	}
	else {
		sx += 1;
	}
	p = sy * gridSize;
	px = south.x * p;
	py = south.y * p;
	pz = south.z * p;
	p = sx * gridSize;
	px += east.x * p;
	py += east.y * p;
	pz += east.z * p;
	p = groundPos;
	px += up.x * p;
	py += up.y * p;
	pz += up.z * p;
	this.points.push(new glidias.Vec3(px,py,pz,1));
	{
		if(px < this.minX) this.minX = px;
		if(py < this.minY) this.minY = py;
		if(pz < this.minZ) this.minZ = pz;
		if(px > this.maxX) this.maxX = px;
		if(py > this.maxY) this.maxY = py;
		if(pz > this.maxZ) this.maxZ = pz;
	}
	p = sy * gridSize;
	px = south.x * p;
	py = south.y * p;
	pz = south.z * p;
	p = sx * gridSize;
	px += east.x * p;
	py += east.y * p;
	pz += east.z * p;
	p = groundPos + doorHeight;
	px += up.x * p;
	py += up.y * p;
	pz += up.z * p;
	this.points.push(new glidias.Vec3(px,py,pz,1));
	{
		if(px < this.minX) this.minX = px;
		if(py < this.minY) this.minY = py;
		if(pz < this.minZ) this.minZ = pz;
		if(px > this.maxX) this.maxX = px;
		if(py > this.maxY) this.maxY = py;
		if(pz > this.maxZ) this.maxZ = pz;
	}
	if(dir == 1 || dir == 2) this.points.reverse();
	glidias.AABBUtils.expandWithPoint(this.points[0],this);
	glidias.AABBUtils.expandWithPoint(this.points[2],this);
	return dir;
}