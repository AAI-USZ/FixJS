function(worldCoords) {
		if (worldCoords == null) {
			return null;
		}

		var pixelCoords = TissueStack.Utils.transformWorldCoordinatesToPixelCoordinates(
				[worldCoords.x, worldCoords.y, worldCoords.z, 1],
				this.worldCoordinatesTransformationMatrix);
		
		if (pixelCoords == null) {
			return null;
		}
		
		pixelCoords = {x: pixelCoords[0], y: pixelCoords[1], z: pixelCoords[2]};
		
		// now we have to correct x and y according to their zoom level
		if (this.zoom_level == 1) {
			pixelCoords.x = Math.floor(pixelCoords.x * (this.x / this.one_to_one_x));
			pixelCoords.y = this.y - Math.floor(pixelCoords.y * (this.y / this.one_to_one_y));
			pixelCoords.z = Math.floor(pixelCoords.z);
		} else {
			pixelCoords.x = Math.ceil(pixelCoords.x * (this.x / this.one_to_one_x));
			pixelCoords.y = this.y - Math.ceil(pixelCoords.y * (this.y /this.one_to_one_y));
			pixelCoords.z = Math.ceil(pixelCoords.z);
		}
		
		// because of rounding inaccuracies it can happen that exceed the image's pixel dimensions by 1,
		// not to mention that we could have been handed in extreme coordinates that exceeded the world coordinates to begin with 
		if (pixelCoords.x < 0) {
			pixelCoords.x = 0;
		} else if (pixelCoords.x >= this.x) {
			pixelCoords.x = this.x - 1;
		}
		if (pixelCoords.y < 0) {
			pixelCoords.y = 0;
		} else if (pixelCoords.y >= this.y) {
			pixelCoords.y = this.y - 1;
		}
		if (pixelCoords.z < 0) {
			pixelCoords.z = 0;
		} else if (pixelCoords.z >= this.max_slices) {
			pixelCoords.z = this.max_slices;
		}
		
		// return pixel coordinates
		return pixelCoords;
	}