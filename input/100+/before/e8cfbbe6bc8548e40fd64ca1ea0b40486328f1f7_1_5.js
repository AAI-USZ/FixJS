function(f){

	vec3.set(vec3.create(f), this.focus);

	this.update();

	this.debugMessage('Camera: Updated focus: ' + this.focus.toString(1));

}