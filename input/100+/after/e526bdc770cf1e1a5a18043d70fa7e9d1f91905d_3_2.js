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

	TissueStack.Utils.adjustScreenContentToActualScreenSize(maxDataSets);
	
	if(TissueStack.desktop){
		TissueStack.Utils.adjustBorderColorWhenMouseOver();
	}
	
	for (var x=0;x<maxDataSets;x++) {
		var dataSet = datasets[x];
		
		if (!dataSet.data || dataSet.data.length == 0) {
			alert("Data set '" + dataSet.id + "' does not have any planes associated with it!");
			continue; 
		}
		
		// we use that for the image service to be able to abort pending requests
		var sessionId = TissueStack.Utils.generateSessionId();
		
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
					dataForPlane.isTiled,
					dataForPlane.oneToOneZoomLevel,
					planeId,
					dataForPlane.maxSclices,
					dataForPlane.maxX,
					dataForPlane.maxY,
					zoomLevels,
					transformationMatrix);

			// this is a bit of a hack to not have to change the fixed html layout if we have only 1 plane (classic 2D data):
			// in order to use the main view which is hard-coded to plane with id 'y', we'll make the only plane that we have 'y' 
			if (dataSet.data.length == 1) {
				planeId = 'y';
				extent.plane = planeId;
			}

			// create canvas
			var canvasElementSelector = "dataset_" + (x+1); 
			var plane = new TissueStack.Canvas(extent, "canvas_" + planeId + "_plane", canvasElementSelector);
			plane.sessionId = sessionId;

			// store plane  
			dataSet.planes[planeId] = plane;

			// get the real world coordinates 
			dataSet.realWorldCoords[planeId] = plane.getDataExtent().getExtentCoordinates();
			
			// display data extent info on page
			plane.updateExtentInfo(dataSet.realWorldCoords[planeId]);
			
			// for desktop version show 2 small canvases
			if ((TissueStack.desktop || TissueStack.tablet) && planeId != 'y') {
				plane.changeToZoomLevel(0);
				
			}
			
			if (TissueStack.phone ) {
				plane.changeToZoomLevel(0);
				
			}
			// fill canvases
			plane.queue.drawLowResolutionPreview();
			plane.queue.drawRequestAfterLowResolutionPreview();
		}
	} 
	
}