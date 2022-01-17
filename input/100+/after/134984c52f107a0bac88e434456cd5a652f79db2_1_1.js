function(sliderId, actualDataSet) {
			if (!sliderId) {
				return;
			}
			
			var planeId = null;
			/*
			if (TissueStack.phone) {
				return sliderId.substring("canvas_".length, "canvas_".length + 1);
			}
			*/
			var plane =
				TissueStack.Utils.returnFirstOccurranceOfPatternInStringArray($("#" + sliderId).attr("class").split(" "), "^canvas_");
			if (!plane) {
				return;
			}

			var startPos = "canvas_".length;
			planeId = plane.substring(startPos, startPos + 1);

			var dataset_prefixEnd = sliderId.lastIndexOf("_canvas_main_slider");
			if (dataset_prefixEnd > 0 && sliderId.substring(0,dataset_prefixEnd) != actualDataSet.planes[planeId].dataset_id) {
				return null;
			}
			
			return planeId;
		}