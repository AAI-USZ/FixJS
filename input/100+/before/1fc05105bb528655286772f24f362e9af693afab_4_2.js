function(event) {
				var plane =
					TissueStack.Utils.returnFirstOccurranceOfPatternInStringArray(
							$("#" + (TissueStack.desktop || TissueStack.tablet ? "dataset_" + (event.data[0].x + 1) + "_": "") + "main_view_canvas").attr("class").split(" "), "^canvas_");
				if (!plane) {
					return;
				}
				var startPos = "canvas_".length;
				var planeId = plane.substring(startPos, startPos + 1);
				
				var xCoord = parseFloat($('#canvas_point_x').val());
				var yCoord = parseFloat($('#canvas_point_y').val());
				var zCoord = parseFloat($('#canvas_point_z').val());
				
				if (isNaN(xCoord) || isNaN(yCoord) || isNaN(zCoord)
						|| xCoord.length == 0 || yCoord.length == 0 || zCoord.length == 0
						|| xCoord < event.data[0].actualDataSet.realWorldCoords[planeId].min_x || xCoord > event.data[0].actualDataSet.realWorldCoords[planeId].max_x 
						|| yCoord < event.data[0].actualDataSet.realWorldCoords[planeId].min_y || yCoord > event.data[0].actualDataSet.realWorldCoords[planeId].max_y
						|| zCoord < event.data[0].actualDataSet.realWorldCoords[planeId].min_z || zCoord > event.data[0].actualDataSet.realWorldCoords[planeId].max_z) {
					alert("Illegal coords");
					return;
				}
				
				// if we had a transformation matrix, we know we have been handed in real word coords and therefore need to convert back to pixel
				var givenCoords = {x: xCoord, y: yCoord, z: zCoord};
				plane = event.data[0].actualDataSet.planes[planeId];
				if (plane.getDataExtent().worldCoordinatesTransformationMatrix) {
					givenCoords = plane.getDataExtent().getPixelForWorldCoordinates(givenCoords);
				}
	
				plane.redrawWithCenterAndCrossAtGivenPixelCoordinates(givenCoords);
				
				var slider = $("#" + (plane.dataset_id == "" ? "" : plane.dataset_id + "_") + "canvas_main_slider");
				if (slider) {
					slider.val(givenCoords.z);
					slider.blur();
				}
			}