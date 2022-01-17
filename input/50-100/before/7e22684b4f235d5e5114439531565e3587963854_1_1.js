function(CubeViz_Parameters) {
		
		console.log(CubeViz_Parameters);
		this.CubeViz_Parameters = CubeViz_Parameters;
		this.modelUrl = CubeViz_Parameters.modelUrl;
		this.cubevizPath = CubeViz_Parameters.cubevizPath;
		this.dimensions = CubeViz_Parameters.selectedDimensions;
		this.measures = CubeViz_Parameters.selectedMeasures;
	}