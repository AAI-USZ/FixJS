function(dx,dy){

	this.task = vxl.def.camera.task.PAN;

	

	var camera = this.camera;

	var canvas = camera.view.canvas;

	var scene = camera.view.scene;

	

	var dimMax = Math.max(canvas.width, canvas.height);

	

	var deltaX = 1 / dimMax;

	var deltaY = 1 / dimMax;

				

	var ndx = dx * deltaX * this.MOTION_FACTOR * scene.bb.max();

	var ndy = dy * deltaY * this.MOTION_FACTOR * scene.bb.max();



	camera.pan(ndx,ndy);

	camera.refresh();

	

}