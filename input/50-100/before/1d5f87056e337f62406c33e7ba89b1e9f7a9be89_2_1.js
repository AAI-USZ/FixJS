function(element) {
	this.perspectiveMat = mat4.create();
	mat4.perspective(70, element.offsetWidth/element.offsetHeight, 0.1, 100, this.perspectiveMat);
	//mat4.ortho(-2, 2, -2, 2, -10, 10, this.perspectiveMat);
	this.element = element;
}