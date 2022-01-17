function() {

		return  "?foo=&" +
                "modelUrl="+this.modelUrl+
                "&sparqlEndpoint=" + this.sparqlEndpoint + 
                "&selectedGraph=" + $.toJSON(this.selectedGraph) +
                "&selectedDSD=" + $.toJSON(this.selectedDSD) +
                "&selectedDS=" + $.toJSON(this.selectedDS) +
                "&selectedMeasures=" + $.toJSON(this.selectedMeasures) +
                "&selectedDimensions=" + $.toJSON(this.selectedDimensions) +
                "&selectedDimensionComponents=" + $.toJSON(this.selectedDimensionComponents.selectedDimensionComponents) +
                "&selectedChartType=" + this.chartType;
	}