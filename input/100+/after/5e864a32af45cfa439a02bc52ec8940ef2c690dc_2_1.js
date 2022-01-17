function() {
		var _this = this;

		// TOUCH END and MOUSE UP
		this.getCanvasElement().bind("touchend mouseup", function(e) {
			// call pan move
			_this.panEnd();
		});
		
		// CLICK
		if (this.include_cross_hair) {
			this.getCanvasElement().bind("click", function(e) {
			
				if (e.originalEvent.touches) {
					var touches = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
					e.pageX = touches.pageX;
					e.pageY = touches.pageY;
				}
			
				// call click
				_this.click(e );
			});
		}
		
		// SYNC
		$(document).bind("sync", function(e, data_id, dataset_id, timestamp, action, plane, zoom_level, slice, coords, max_coords_of_event_triggering_plane, upperLeftCorner, crossCoords, canvasDims) {
			// call sync
			_this.sync(e,  data_id, dataset_id, timestamp, action, plane, zoom_level, slice, coords, max_coords_of_event_triggering_plane, upperLeftCorner, crossCoords, canvasDims);
		});

		// SYNC for ZOOM
		$(document).bind("zoom", function(e,  data_id, dataset_id, timestamp, action, plane, zoom_level, slice) {
			// call sync zoom
			_this.sync_zoom(e,  data_id, dataset_id, timestamp, action, plane, zoom_level, slice);
		});
				
	}