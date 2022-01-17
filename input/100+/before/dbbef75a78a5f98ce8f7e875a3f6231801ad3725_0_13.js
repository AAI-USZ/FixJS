function(object,speed,speedMultiplier,mouseSensitivity) { if( object === $_ ) return; {
	if(mouseSensitivity == null) mouseSensitivity = 1;
	if(speedMultiplier == null) speedMultiplier = 3;
	if(speed == null) speed = 16;
	this.eventSource = { };
	this.maxPitch = 1e+22;
	this.minPitch = -1e+22;
	this.mousePoint = new jeash.geom.Point();
	this._vin = [.0,.0,.0];
	this._vout = [.0,.0,.0];
	this._up = false;
	this._down = false;
	this._forward = false;
	this._back = false;
	this._left = false;
	this._right = false;
	this._accelerate = false;
	this.mouseLook = true;
	this.displacement = new jeash.geom.Vector3D();
	this._object = object;
	this.speed = speed;
	this.speedMultiplier = speedMultiplier;
	this.mouseSensitivity = mouseSensitivity;
}}