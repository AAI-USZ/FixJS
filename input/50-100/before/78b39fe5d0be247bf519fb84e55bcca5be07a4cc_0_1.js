function(event) {
		var emptyDimensions = CubeViz_Main_Module.checkDimensionElementCount();
		if(emptyDimensions.length != 0) {
			CubeViz_Main_Module.showEmptyDimensionsWarning(emptyDimensions);
		} else {
			
		}
		console.log(emptyDimensions);
		//var config = CubeViz_Main_Module.makeLink();
		//CubeViz_Ajax_Module.saveLinkToFile(config);
		/*
		
		
		var everything_okay = true;
		for(var i = 0, okay_length = okay.length; i < okay_length; i++) {
			everything_okay = everything_okay && okay[i];
		}
		
		if(everything_okay) {
			var config = CubeViz_Main_Module.makeLink();
			CubeViz_Ajax_Module.saveLinkToFile(config, CubeViz_Module_Parameters.cubevizPath);
		}*/
	}