function(dataSet, use_image_service) {
		// loop over all planes in the data, create canvas and extent objects, then display them
		for (var i=0; i < dataSet.data.length; i++) {
			var dataForPlane = dataSet.data[i];
			var planeId = dataForPlane.name;
			
			var zoomLevels = eval(dataForPlane.zoomLevels);
			transformationMatrix = eval(dataForPlane.transformationMatrix);
			
			// create extent
			var extent = 
				new TissueStack.Extent(
					dataSet.id,
					!use_image_service,
					dataForPlane.oneToOneZoomLevel,
					planeId,
					dataForPlane.maxSclices,
					dataForPlane.maxX,
					dataForPlane.maxY,
					zoomLevels,
					transformationMatrix);
			
			// create canvas
			var canvasElementSelector = "dataset_1"; 
			var plane = new TissueStack.Canvas(
					extent,
					"canvas_" + planeId + "_plane",
					canvasElementSelector,
					this.include_cross_hair);

			// store plane  
			dataSet.planes[planeId] = plane;

			// get the real world coordinates 
			dataSet.realWorldCoords[planeId] = plane.getDataExtent().getExtentCoordinates();
			
			// display data extent info on page
			plane.updateExtentInfo(dataSet.realWorldCoords[planeId]);
			
			// if we have more than 1 plane => show y as the main plane and make x and z the small views
			if (i != 0) {
				plane.changeToZoomLevel(0);
			}
			
			// fill canvases
			plane.queue.drawLowResolutionPreview();
			plane.queue.drawRequestAfterLowResolutionPreview();
		}
	}