function(json) {
			this.retrievedResultObservations = json;
			$(body).trigger("AjaxResultObservationsRetrieved.CubeViz");
		}