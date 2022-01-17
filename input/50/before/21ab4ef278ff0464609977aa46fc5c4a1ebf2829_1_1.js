function(json) {
			this.retrievedCubeVizParameters = json;
			$(body).trigger("AjaxCubeVizParametersRetrieved.CubeViz");
		}