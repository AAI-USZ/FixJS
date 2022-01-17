function(data_extent, canvas_id, dataset_id) {
	// assemble data set id
	this.dataset_id = typeof(dataset_id) != "string" ? "" : dataset_id;
	this.setDataExtent(data_extent);
	this.setCanvasElement(this.dataset_id == "" ? canvas_id : (this.dataset_id + "_" + canvas_id));
	// set dimensions
	var tmpCanvasElement = this.getCanvasElement()[0];
	this.setDimensions(tmpCanvasElement.width, tmpCanvasElement.height);
	this.centerUpperLeftCorner();
	this.drawCoordinateCross(this.getCenter());
	this.events = new TissueStack.Events(this); 
	this.queue = new TissueStack.Queue(this);
	// make parent and ourselves visible
	this.getCanvasElement().parent().removeClass("hidden");
	
}