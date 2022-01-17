function() {

		return  "?foo=&" +
                "modelUrl="+$.toJSON(this.modelUrl)+
                "&sparqlEndpoint=" + $.toJSON(this.sparqlEndpoint) + 
                "&selectedGraph=" + $.toJSON(this.selectedGraph) +
                "&selectedDSD=" + $.toJSON(this.selectedDSD) +
                "&selectedDS=" + $.toJSON(this.selectedDS) +
                "&selectedMeasures=" + $.toJSON(this.allMeasures) +
                "&selectedDimensions=" + $.toJSON(this.allDimensions) +
                "&selectedDimensionComponents=" + $.toJSON(this.selectedDimensionComponents.selectedDimensionComponents) +
                "&selectedChartType=" + this.chartType;
	}