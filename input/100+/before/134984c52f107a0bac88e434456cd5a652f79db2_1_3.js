function () {
	if (TissueStack.dataSetNavigation.selectedDataSets.count == 0) {
		return;
	}

	// get all data sets that have been selected from the store and stuff them into the array for binding its events
	var datasets = [];
	for (var x=0;x<TissueStack.dataSetNavigation.selectedDataSets.count;x++) {
		var selectedKey = TissueStack.dataSetNavigation.selectedDataSets["dataset_" + (x+1)]; 
		datasets.push(TissueStack.dataSetStore.getDataSetById(selectedKey)); 
	}

	// determine the maximum number of data sets that are displayed. depends on the type of display
	var maxDataSets = (TissueStack.phone || TissueStack.tablet) ? 1 : 2;
	if (maxDataSets > datasets.length) {
		maxDataSets = datasets.length;
	}

	// DRAWING INTERVAL CHANGE HANDLER
	// avoid potential double binding by un-binding at this stage
	$('#drawing_interval_button').unbind("click");
	//rebind
	$('#drawing_interval_button').bind("click", function() {
		TissueStack.configuration['default_drawing_interval'].value = parseInt($('#drawing_interval').val());
		
		for (var x=0;x<maxDataSets;x++) {
			var dataSet = datasets[x];
			
			for (var id in dataSet.planes) {	
				dataSet.planes[id].queue.setDrawingInterval(TissueStack.configuration['default_drawing_interval'].value);
			}
		}
	});
	
	// COLOR MAP CHANGE HANDLER
	// avoid potential double binding by un-binding at this stage
	$('input[name="color_map"]').unbind("click");
	// rebind
	$('input[name="color_map"]').bind("click", function(e) {
		for (var x=0;x<maxDataSets;x++) {
			var dataSet = datasets[x];
			
			for (var id in dataSet.planes) {	
				dataSet.planes[id].color_map = e.target.value;
				dataSet.planes[id].drawMe();
				dataSet.planes[id].applyColorMapToCanvasContent();
			}
		}
	});

	// now let's bind events that are intimately linked to their own data set
	for (var y=0;y<maxDataSets;y++) {
		var dataSet = datasets[y];
	
		// MAXIMIZING SIDE VIEWS
		if (TissueStack.desktop || TissueStack.tablet) {
			// avoid potential double binding by un-binding at this stage
			$('#dataset_' + (y+1) + '_left_side_view_maximize, #dataset_' + (y+1) + '_right_side_view_maximize').unbind("click");
			// rebind
			$('#dataset_' + (y+1) + '_left_side_view_maximize, #dataset_' + (y+1) + '_right_side_view_maximize').bind("click", [{actualDataSet: dataSet,x: y}], function(event) {
				// what side view and canvas called for maximization
				if (!event.target.id || !$("#" + event.target.id).attr("class")) {
					return;
				}

				var plane = TissueStack.Utils.returnFirstOccurranceOfPatternInStringArray($("#" + event.target.id).attr("class").split(" "), "^canvas_");
				if (!plane) {
					return;
				}
				var startPos = "canvas_".length;
				var sideViewPlaneId = plane.substring(startPos, startPos + 1);
				
				x = event.data[0].x;
				
				plane = TissueStack.Utils.returnFirstOccurranceOfPatternInStringArray($("#dataset_" + (x+1) +"_main_view_canvas").attr("class").split(" "), "^canvas_");
				if (!plane) {
					return;
				}
				var mainViewPlaneId = plane.substring(startPos, startPos + 1);
				
				// with the id we get the can get the main canvas and the side canvas and swap them, including their dimensions and zoom levels
				var mainCanvas = $("#dataset_" + (x+1) + "_main_view_canvas");
				var mainCanvasChildren = mainCanvas.children("canvas");
				if (!mainCanvasChildren || mainCanvasChildren.length == 0) {
					return;
				}
				mainCanvasChildren.detach();
				
				startPos = event.target.id.indexOf("_maximize");
				if (startPos < 0) {
					return;
				}
				var sideCanvasId = event.target.id.substring(0, startPos);

				var sideCanvas = $("#" + sideCanvasId + "_canvas");
				var sideCanvasChildren = sideCanvas.children("canvas");
				if (!sideCanvasChildren || sideCanvasChildren.length == 0) {
					return;
				}
				sideCanvasChildren.detach();
				
				// swap dimensions
				var sideCanvasRelativeCross = event.data[0].actualDataSet.planes[sideViewPlaneId].getRelativeCrossCoordinates(); 
				var mainCanvasRelativeCross = event.data[0].actualDataSet.planes[mainViewPlaneId].getRelativeCrossCoordinates();
				
				var sideCanvasDims = {x: sideCanvasChildren[0].width, y: sideCanvasChildren[0].height};
				var mainCanvasDims = {x: mainCanvasChildren[0].width, y: mainCanvasChildren[0].height};
				
				var tmpAttr = [];
				for (var i=0; i < sideCanvasChildren.length; i++) {
					tmpAttr[i] = sideCanvasChildren[i].getAttribute("class");
					sideCanvasChildren[i].setAttribute("class", mainCanvasChildren[i].getAttribute("class"));
					sideCanvasChildren[i].width = mainCanvasDims.x;
					sideCanvasChildren[i].height = mainCanvasDims.y;
				}
				event.data[0].actualDataSet.planes[sideViewPlaneId].setDimensions(mainCanvasDims.x, mainCanvasDims.y);
				// store zoom level for side view
				var zoomLevelSideView = event.data[0].actualDataSet.planes[sideViewPlaneId].getDataExtent().zoom_level;

				for (var i=0; i < mainCanvasChildren.length; i++) {
					mainCanvasChildren[i].setAttribute("class", tmpAttr[i]);
					mainCanvasChildren[i].width = sideCanvasDims.x;
					mainCanvasChildren[i].height = sideCanvasDims.y;
				}
				event.data[0].actualDataSet.planes[mainViewPlaneId].setDimensions(sideCanvasDims.x, sideCanvasDims.y);
								
				mainCanvas.append(sideCanvasChildren);
				sideCanvas.append(mainCanvasChildren);
				
				// remember change in class
				$("#" + sideCanvasId + "_maximize").addClass("canvas_" + mainViewPlaneId);
				$("#" + sideCanvasId  + "_maximize").removeClass("canvas_" + sideViewPlaneId);
				$("#dataset_" + (x+1) +"_main_view_canvas").addClass("canvas_" + sideViewPlaneId);
				$("#dataset_" + (x+1) +"_main_view_canvas").removeClass("canvas_" + mainViewPlaneId);
				$("#dataset_" + (x+1) + "_canvas_main_slider").addClass("canvas_" + sideViewPlaneId);
				$("#dataset_" + (x+1) + "_canvas_main_slider").removeClass("canvas_" + mainViewPlaneId);
				// swap slice dimension values
				$("#dataset_" + (x+1) + "_canvas_main_slider").attr("value", event.data[0].actualDataSet.planes[sideViewPlaneId].data_extent.slice);
				$("#dataset_" + (x+1) + "_canvas_main_slider").attr("max", event.data[0].actualDataSet.planes[sideViewPlaneId].data_extent.max_slices);
				
				// redraw and change the zoom level as well
				event.data[0].actualDataSet.planes[sideViewPlaneId].redrawWithCenterAndCrossAtGivenPixelCoordinates(sideCanvasRelativeCross);
				event.data[0].actualDataSet.planes[mainViewPlaneId].redrawWithCenterAndCrossAtGivenPixelCoordinates(mainCanvasRelativeCross);
				event.data[0].actualDataSet.planes[sideViewPlaneId].changeToZoomLevel(event.data[0].actualDataSet.planes[mainViewPlaneId].getDataExtent().zoom_level);
				event.data[0].actualDataSet.planes[mainViewPlaneId].changeToZoomLevel(zoomLevelSideView);
				event.data[0].actualDataSet.planes[sideViewPlaneId].updateExtentInfo(
				event.data[0].actualDataSet.planes[sideViewPlaneId].getDataExtent().getExtentCoordinates());
			});

			// COORDINATE CENTER FUNCTIONALITY FOR DESKTOP
			// avoid potential double binding by un-binding at this stage
			$('#dataset_' + (y+1) + '_center_point_in_canvas').unbind("click");
			// rebind
			$('#dataset_' + (y+1) + '_center_point_in_canvas').bind("click", [{actualDataSet: dataSet,x: y}], function(event) {
				var plane =
					TissueStack.Utils.returnFirstOccurranceOfPatternInStringArray(
							$("#" + (TissueStack.desktop || TissueStack.tablet || TissueStack.phone? "dataset_" + (event.data[0].x + 1) + "_": "") + "main_view_canvas").attr("class").split(" "), "^canvas_");
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
			});
		}	
	
		// Z PLANE AKA SLICE SLIDER 
		var extractCanvasId = function(sliderId, actualDataSet) {
			if (!sliderId) {
				return;
			}
			
			var planeId = null;
			if (TissueStack.phone) {
				return sliderId.substring("canvas_".length, "canvas_".length + 1);
			}
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
		};
		var triggerQueuedRedraw = function(id, slice, actualDataSet) {
			if (!id) {
				return;
			}
			
			if (slice < 0 || slice > actualDataSet.planes[id].data_extent.max_slices) {
				return;
			}
			
			actualDataSet.planes[id].events.updateCoordinateDisplay();
			actualDataSet.planes[id].events.changeSliceForPlane(slice);			
		};
		
		(function(actualDataSet, x) {
			// z dimension slider: set proper length and min/max for dimension
			// sadly a separate routine is necessary for the active page slider.
			// for reasons unknown the active page slider does not refresh until after a page change has been performed 
			if ((TissueStack.desktop || TissueStack.tablet)) {
				$('.ui-slider-vertical').css({"height": TissueStack.canvasDimensions.height - 50});
			} 
			$(TissueStack.phone ? ('.canvasslider') : ('#dataset_' + (x+1) + '_canvas_main_slider')).each(
				function() {
					var id = extractCanvasId(this.id, actualDataSet);
					
					if (!id) {
						return;
					}
					
					$(this).attr("min", 0);
					$(this).attr("max", actualDataSet.planes[id].data_extent.max_slices);
					$(this).attr("value", actualDataSet.planes[id].data_extent.slice);
					$(this).blur();
				}
			);
			// avoid potential double binding by un-binding at this stage
			$('#dataset_' + (x+1) + '_canvas_main_slider').unbind("change");
			// rebind
			$('#dataset_' + (x+1) + '_canvas_main_slider').bind ("change", function (event, ui)  {
				var id = extractCanvasId(this.id, actualDataSet);
				if (!id) {
					return;
				}
	
				triggerQueuedRedraw(id, this.value, actualDataSet);
			});
	
			// rebind
			if (TissueStack.phone) {
				$('.canvasslider').live ("slidercreate", function () {
					var res = $('#' + this.id).data('events');
					// unbind previous change
					$('#' + this.id).unbind("change");
					if (!res.change || res.change.length == 0) {
						$('#' + this.id).bind("change", function (event, ui)  {
							var id = extractCanvasId(this.id);
							if (!id) {
								return;
							}
							triggerQueuedRedraw(id, this.value, actualDataSet);
						});
					}
				});
			}
		})(dataSet, y);
	}
}