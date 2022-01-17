function vxlCamera(vw,t) {



	this.view 		= vw;

    this.matrix 	= mat4.identity();

    this.up 		= vec3.createFrom(0, 1, 0);

	this.right 		= vec3.createFrom(1, 0, 0);

	this.normal 	= vec3.createFrom(0, 0, 0);

    this.position 	= vec3.createFrom(0, 0, 1);

    this.focus		= vec3.createFrom(0, 0, 0);

    this.azimuth 	= 0;

    this.elevation 	= 0;

	this.steps		= 0;

    this.home 		= vec3.createFrom(0,0,0);

    this.id         = 0;

    this.FOV        = 30;

    this.Z_NEAR     = 0.1;    

    this.Z_FAR      = 10000;     

	

	if (t != undefined && t !=null){

        this.type = t;

    }

    else {

        this.type = vxl.def.camera.type.ORBITING;

    }

    

	this.distance 	= 0;

	this.debug 		= false;

	this.state 	    = new vxlCameraState(this);

}