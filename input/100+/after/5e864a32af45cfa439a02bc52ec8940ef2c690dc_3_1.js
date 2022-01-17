function(slice) {
		if (this.zoom_level == 1) {
			this.slice = Math.floor(slice / this.zoom_level_factor);	
		} else {
			this.slice = Math.ceil(slice / this.zoom_level_factor);
		}

		var canvasSlider = $("#" + (this.canvas.dataset_id == "" ? "canvas_" : this.canvas.dataset_id + "_canvas_") + "main_slider");
		if (canvasSlider.length == 0) {
			return;
		}
		
		var mainCanvas = this.plane;
		
		if(!TissueStack.phone){
			var planeId = 
				TissueStack.Utils.returnFirstOccurranceOfPatternInStringArray(canvasSlider.attr("class").split(" "), "^canvas_");
			if (planeId) {
				var startPos = "canvas_".length;
				mainCanvas = planeId.substring(startPos, startPos + 1);
			}
			
			if (mainCanvas == this.plane && canvasSlider && canvasSlider.length > 0) {
				slice = this.slice < 0 ? this.max_slices : (this.slice > this.max_slices ? 0 : this.slice);
				canvasSlider.attr("value",slice > this.max_slices ? this.max_slices : slice);
				canvasSlider.blur();
			}
		}
	}