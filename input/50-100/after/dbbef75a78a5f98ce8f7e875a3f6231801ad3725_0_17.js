function(p) {
	if( p === $_ ) return;
	this.id = glidias.AABBSector.ID_COUNT++;
	this.renderId = -999999999;
	this.collisionId = -999999999;
	this.geom = new a3d.Geometry();
}