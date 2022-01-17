function(mouseCoords, pixelCoords, worldCoords) {
		var log;
		
		pixelCoords = this.getXYCoordinatesWithRespectToZoomLevel(pixelCoords);
		// outside of extent check
		if (!pixelCoords || pixelCoords.x < 0 || pixelCoords.x > this.data_extent.x -1 ||  pixelCoords.y < 0 || pixelCoords.y > this.data_extent.y -1) {
			log = $("#canvas_point_x").val("");
			log = $("#canvas_point_y").val("");
			log = $("#canvas_point_z").val("");
			
			return;
		}
			
		// for desktop and tablet
		if(TissueStack.desktop || TissueStack.tablet ){
			var x = worldCoords ? worldCoords.x : pixelCoords.x;
			var y = worldCoords ? worldCoords.y : pixelCoords.y;
			var z = worldCoords ? worldCoords.z : pixelCoords.z;

			log = $("#canvas_point_x").val(Math.round(x *1000) / 1000);
			log = $("#canvas_point_y").val(Math.round(y *1000) / 1000);
			if (this.data_extent.max_slices > 1) {
				log = $("#canvas_point_z").val(Math.round(z *1000) / 1000);
			} else {
				log = $("#canvas_point_z").val("");
			}
			
			var dataSet = TissueStack.dataSetStore.getDataSetById(this.getDataExtent().data_id);
			
			this.updateExtentInfo(dataSet.realWorldCoords[this.data_extent.plane]);
			
			return;
		}
		
		// for everything else...
		if (mouseCoords) {
			log = $('.coords');
			log.html("Canvas > X: " + mouseCoords.x + ", Y: " + mouseCoords.y);
		}
		log = $('.pixel_coords');
		log.html("Pixels > X: " + pixelCoords.x + ", Y: " + pixelCoords.y);
		if (worldCoords) {
			log = $('.world_coords');
			log.html("World > X: " +  Math.round(worldCoords.x * 1000) / 1000 + ", Y: " +  Math.round(worldCoords.y * 1000) / 1000);
		}
	}