function(event) {
		var emptyDimensions = CubeViz_Main_Module.checkDimensionElementCount();
		if(emptyDimensions.length != 0) {
			CubeViz_Main_Module.showEmptyDimensionsWarning(emptyDimensions);
		} else {
			var config = CubeViz_Main_Module.makeLink();
			CubeViz_Ajax_Module.saveLinkToFile(config);
		}
	}