function(element) {
	Rubikjs.Renderer.call(this, element);
	var canvas = element.localName == "canvas" ? element : undefined;
	if(canvas != undefined) {
		try {
			this.ctx = element.getContext("2d");
			if(this.ctx == undefined) {
				alert("No canvas :("); //To be removed in the future
			}
		} catch(e) {}
	}
	this.triangles = [];
}