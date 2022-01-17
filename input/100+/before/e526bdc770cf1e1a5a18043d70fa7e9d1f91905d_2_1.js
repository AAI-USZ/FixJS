function(e, delta) {
		// make sure zoom delta is whole number
		delta = Math.ceil(delta);
		
		if (delta < 1) {
			delta = -1;
		} else if (delta > 1) {
			delta = 1;
		} 
							
		var newZoomLevel = this.canvas.getDataExtent().zoom_level + delta;
		if (newZoomLevel == this.canvas.data_extent.zoom_level ||  newZoomLevel < 0 || newZoomLevel >= this.canvas.data_extent.zoom_levels.length) {
			return;
			}
		
		var now = new Date().getTime();
		
		this.canvas.queue.addToQueue(
				{	data_id : this.canvas.data_extent.data_id,
					dataset_id : this.canvas.dataset_id,	 
					timestamp : now,
					action : "ZOOM",
					plane: this.canvas.getDataExtent().plane,
					zoom_level : newZoomLevel,
					slice : this.canvas.getDataExtent().slice
					
				});
		event.stopPropagation();
	}