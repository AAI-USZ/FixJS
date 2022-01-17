function(radiusX,radiusY,radiusZ,threshold) { if( radiusX === $_ ) return; {
	if(threshold == null) threshold = 0.001;
	this.threshold = threshold;
	this.timestamp = 0;
	this.radiusX = radiusX;
	this.radiusY = radiusY;
	this.radiusZ = radiusZ;
	this.matrix = new a3d.Transform3D();
	this.inverseMatrix = new a3d.Transform3D();
	this.sphere = new jeash.geom.Vector3D();
	this.cornerA = new jeash.geom.Vector3D();
	this.cornerB = new jeash.geom.Vector3D();
	this.cornerC = new jeash.geom.Vector3D();
	this.cornerD = new jeash.geom.Vector3D();
	this.collisionPoint = new jeash.geom.Vector3D();
	this.collisionPlane = new jeash.geom.Vector3D();
	this.geometries = new Array();
	this.vertices = new Array();
	this.normals = new Array();
	this.indices = new Array();
	this.numI = 0;
	this.displ = new jeash.geom.Vector3D();
	this.dest = new jeash.geom.Vector3D();
	this.src = new jeash.geom.Vector3D();
}}