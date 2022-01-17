function vxlCameraState(camera) {

	if(!( camera instanceof vxlCamera)) {

		alert('vxlCameraState needs a vxlCamera as argument');

		return null;

	}



	this.c             = camera;

	this.position      = vec3.createFrom(0, 0, 1);

	this.focalPoint    = vec3.createFrom(0, 0, 0);

	

    this.up            = vec3.createFrom(0, 1, 0);

	this.right         = vec3.createFrom(1, 0, 0);

    

	this.distance      = 0;

	this.azimuth       = 0;

	this.elevation     = 0;

    

	this.xTr           = 0;

	this.yTr           = 0;

}