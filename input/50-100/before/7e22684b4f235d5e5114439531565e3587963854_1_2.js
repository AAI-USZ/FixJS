function(linkCode) {
		var action = "getresultobservations";
		$.getJSON(this.cubevizPath + action + "/", "m="+this.modelUrl+"&lC="+linkCode, $.proxy(function(json) {
			this.retrievedResultObservations = json;
			$(body).trigger("AjaxResultObservationsRetrieved.CubeViz");
		}, this));
	}