function(pos) {
	// Get the x and width
	var shape = this.getShape();
	if(pos.x < shape.x + (shape.width/2))
		return -1;
	return 1;
}