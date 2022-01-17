function(timestamp) {
		// this is to prevent preview fetching for the cases when the user is navigating in a view that exceeds the data extent
		// so that they can set the crosshair outside of the extent
		var slice = this.canvas.getDataExtent().slice;
		if (slice < 0 || slice > this.canvas.getDataExtent().max_slices) {
			this.lowResolutionPreviewDrawn = true;
			return;
		}

		this.lowResolutionPreviewDrawn = false;

		var ctx = this.canvas.getCanvasContext();
		
		// nothing to do if we are totally outside
		if (this.canvas.upper_left_x < 0 && (this.canvas.upper_left_x + this.canvas.getDataExtent().x) <=0
				|| this.canvas.upper_left_x > 0 && this.canvas.upper_left_x > this.canvas.dim_x
				|| this.canvas.upper_left_y <=0 || (this.canvas.upper_left_y - this.canvas.getDataExtent().y) >= this.canvas.dim_y) {
			this.lowResolutionPreviewDrawn = true;
			return;
		} 
		
		var dataSet = TissueStack.dataSetStore.getDataSetById(this.canvas.data_extent.data_id);
		if (!dataSet) {
			alert("Couldn't find data set with id: " + this.canvas.data_extent.data_id);
			return;
		}
		
		var canvasX = 0;
		var imageOffsetX = 0;
		var width = this.canvas.getDataExtent().x;
		if (this.canvas.upper_left_x < 0) {
			width += this.canvas.upper_left_x;
			imageOffsetX = this.canvas.getDataExtent().x - width;
		} else {
			canvasX = this.canvas.upper_left_x;
		}
		
		if (canvasX + width > this.canvas.dim_x) {
			width = this.canvas.dim_x - canvasX;
		}

		var canvasY = 0;
		var imageOffsetY = 0;
		var height = this.canvas.getDataExtent().y;
		if (this.canvas.upper_left_y <= this.canvas.dim_y) {
			canvasY = this.canvas.dim_y - this.canvas.upper_left_y;
		} else {
			imageOffsetY = this.canvas.upper_left_y - this.canvas.dim_y;
			height = this.canvas.getDataExtent().y - imageOffsetY;
		}
		
		if (height > this.canvas.dim_y) {
			height = this.canvas.dim_y;
		}
		
		var imageTile = new Image();
		imageTile.crossOrigin = '';
		var src =
			TissueStack.Utils.assembleTissueStackImageRequest(
					"http",
					dataSet.host,
					this.canvas.getDataExtent().getIsTiled(),
					dataSet.filename,
					dataSet.local_id,
					true,
					this.canvas.getDataExtent().getIsTiled() ?
							this.canvas.getDataExtent().zoom_level : 
								this.canvas.getDataExtent().getZoomLevelFactorForZoomLevel(this.canvas.getDataExtent().zoom_level),
					this.canvas.getDataExtent().getOriginalPlane(),
					slice,
					this.canvas.image_format
		);
		// append session id & timestamp for image service
		if (!this.canvas.getDataExtent().getIsTiled()) {
			src += ("&id=" + this.canvas.sessionId);
			src += ("&timestamp=" + this.latestDrawRequestTimestamp);
		}
		imageTile.src = src; 
		

		(function(_this, imageOffsetX, imageOffsetY, canvasX, canvasY, width, height) {
			imageTile.onload = function() {
				if (timestamp < _this.latestDrawRequestTimestamp) {
					_this.lowResolutionPreviewDrawn = true;
					return;
				}
			
				if (this.width < width) {
					width = this.width;
				}

				if (this.height < height) {
					height = this.height;
				}

				ctx.globalAlpha=1;
				ctx.drawImage(this, imageOffsetX, imageOffsetY, width, height, canvasX, canvasY, width, height);
				_this.lowResolutionPreviewDrawn = true;
				
				_this.canvas.applyColorMapToCanvasContent()	;
			};
		})(this, imageOffsetX, imageOffsetY, canvasX, canvasY, width, height);
	}