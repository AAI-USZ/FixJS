function(timestamp) {
		// preliminary check if we are within the slice range
		var slice = this.getDataExtent().slice;
		if (slice < 0 || slice > this.getDataExtent().max_slices) {
			return;
		}
		
		var ctx = this.getCanvasContext();

		// nothing to do if we are totally outside
		if (this.upper_left_x < 0 && (this.upper_left_x + this.getDataExtent().x) <=0
				|| this.upper_left_x > 0 && this.upper_left_x > this.dim_x
				|| this.upper_left_y <=0 || (this.upper_left_y - this.getDataExtent().y) >= this.dim_y) {
			return;
		} 

		var dataSet = TissueStack.dataSetStore.getDataSetById(this.data_extent.data_id);
		if (!dataSet) {
			alert("Couldn't find data set with id: " + this.data_extent.data_id);
			return;
		}
		
		var counter = 0;
		var startTileX = this.upper_left_x / this.getDataExtent().tile_size;
		var canvasX = 0;
		var deltaStartTileXAndUpperLeftCornerX = 0;
		if (startTileX < 0) {
			startTileX = Math.abs(Math.ceil(startTileX));
			deltaStartTileXAndUpperLeftCornerX =  this.getDataExtent().tile_size - Math.abs(this.upper_left_x + startTileX * this.getDataExtent().tile_size);
		} else {
			//startTileX = Math.floor(startTileX);
			startTileX = 0;
			canvasX = this.upper_left_x;
		}
		
		var startTileY = 0;
		var canvasY = 0;
		var deltaStartTileYAndUpperLeftCornerY = 0;
		if (this.upper_left_y <= this.dim_y) {
			canvasY = this.dim_y - this.upper_left_y;
		} else {
			startTileY = Math.floor((this.upper_left_y - this.dim_y)  / this.getDataExtent().tile_size);
			deltaStartTileYAndUpperLeftCornerY = this.getDataExtent().tile_size - (this.upper_left_y - startTileY * this.getDataExtent().tile_size - this.dim_y);
		}

		// for now set end at data extent, we cut off in the loop later once we hit the canvas bounds or data bounds which ever occurs first
		var endTileX = Math.floor(this.getDataExtent().x / this.getDataExtent().tile_size) + ((this.getDataExtent().x % this.getDataExtent().tile_size == 0) ? 0 : 1);
		var endTileY = Math.floor(this.getDataExtent().y / this.getDataExtent().tile_size) + ((this.getDataExtent().y % this.getDataExtent().tile_size == 0) ? 0 : 1);

		var copyOfCanvasY = canvasY;

		// loop over rows
		for (var tileX = startTileX  ; tileX < endTileX ; tileX++) {
			// prelim check
			if (this.data_extent.slice < 0 || this.data_extent.slice >= this.data_extent.x) {
				//break;
			}
			
			var tileOffsetX = startTileX * this.getDataExtent().tile_size;
			var imageOffsetX = 0;
			var width =  this.getDataExtent().tile_size;
			var rowIndex = tileX; 
			
			// reset to initial canvasX
			canvasY = copyOfCanvasY;
			
			// we are at the beginning, do we have a partial?
			if (canvasX == 0 && deltaStartTileXAndUpperLeftCornerX !=0) {
				width = deltaStartTileXAndUpperLeftCornerX;
				imageOffsetX =  this.getDataExtent().tile_size - width;
			}
			
			// we exceed canvas
			if (canvasX == this.dim_x) {
				tileX = endTileX; // this will make us stop in the next iteration 
				width =  this.dim_x - tileOffsetX;
			} else if (canvasX > this.dim_x) {
				break;
			}

			// walk through columns
			for (var tileY = startTileY ; tileY < endTileY ; tileY++) {
				var imageOffsetY = 0;
				var height =  this.getDataExtent().tile_size;
				var colIndex = tileY; 

				// we are at the beginning, do we have a partial?
				if (canvasY == 0 && deltaStartTileYAndUpperLeftCornerY !=0) {
					height = deltaStartTileYAndUpperLeftCornerY;
					imageOffsetY =  this.getDataExtent().tile_size - height;
				}

				if (canvasY  == this.dim_y) {
					tileY = endTileY; // this will make us stop in the next iteration 
					height = this.dim_y - canvasY;
				} else if (canvasY > this.dim_y) {
					break;
				}

				// brief check as to whether there exists a newer drawing request
				if (timestamp && timestamp < this.queue.latestDrawRequestTimestamp) {
					return;
				}
				
				// create the image object that loads the tile we need
				var imageTile = new Image();
				imageTile.crossOrigin = '';
				
				var src = 
					TissueStack.Utils.assembleTissueStackImageRequest(
							"http",
							dataSet.host,
							this.getDataExtent().getIsTiled(),
							dataSet.filename,
							dataSet.local_id,
							false,
							this.getDataExtent().getIsTiled() ?
									this.getDataExtent().zoom_level : 
										this.getDataExtent().getZoomLevelFactorForZoomLevel(this.getDataExtent().zoom_level),
							this.getDataExtent().getOriginalPlane(),
							slice,
							this.image_format,
							this.getDataExtent().tile_size,
							rowIndex,
							colIndex
					);
				// append session id & timestamp for image service
				if (!this.getDataExtent().getIsTiled()) {
					src += ("&id=" + this.sessionId);
					src += ("&timestamp=" + (this.queue.latestDrawRequestTimestamp == 0 ? new Date().getTime() : this.queue.latestDrawRequestTimestamp));
				}
				imageTile.src = src; 

				counter++;
				
				(function(_this, imageOffsetX, imageOffsetY, canvasX, canvasY, width, height, deltaStartTileXAndUpperLeftCornerX, deltaStartTileYAndUpperLeftCornerY, tile_size) {
					imageTile.onload = function() {
						// check with actual image dimensions ...
						if (canvasX == 0 && width != tile_size && deltaStartTileXAndUpperLeftCornerX !=0) {
							imageOffsetX = (tile_size - deltaStartTileXAndUpperLeftCornerX);
							width = this.width - imageOffsetX;
						} else if (this.width < width) {
								width = this.width;
						}

						if (canvasY == 0 && height != tile_size && deltaStartTileYAndUpperLeftCornerY !=0) {
							imageOffsetY = (tile_size - deltaStartTileYAndUpperLeftCornerY);
							height = this.height - imageOffsetY;
						} else	if (this.height < height) {
								height = this.height;
						}

						// damn you async loads
						if (timestamp && timestamp < _this.queue.latestDrawRequestTimestamp) {
							return;
						}
						
						ctx.globalAlpha=1;
						ctx.drawImage(this,
								imageOffsetX, imageOffsetY, width, height, // tile dimensions
								canvasX, canvasY, width, height); // canvas dimensions
						
						counter--;
						
						if (counter == 0) {
							_this.applyColorMapToCanvasContent();
						}
					};
				})(this, imageOffsetX, imageOffsetY, canvasX, canvasY, width, height, deltaStartTileXAndUpperLeftCornerX, deltaStartTileYAndUpperLeftCornerY, this.getDataExtent().tile_size);
				
				// increment canvasY
				canvasY += height;
			}
			
			// increment canvasX
			canvasX += width;
		};
	}