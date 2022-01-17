function(pos) {
	// Get the x and width
	var shape = this.getShape();
	return (pos.x < shape.x + (shape.width/2))?-1:1;
}