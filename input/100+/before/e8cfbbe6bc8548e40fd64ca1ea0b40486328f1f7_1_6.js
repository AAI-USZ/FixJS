function vxlPickerInteractor(view, camera){

	vxlTrackerInteractor.call(this, view, camera);

	this.plist 					= [];

	this.texture 				= null;

	this.framebuffer 			= null;

	this.renderbuffer 			= null;

	this.hitPropertyCallback 	= null;

	this.processHitsCallback 	= null;

	this.addHitCallback 		= null;

	this.removeHitCallback 		= null;

	this.moveCallback 			= null;

	this.picking 				= false;

    this.connectCamera(camera);

}