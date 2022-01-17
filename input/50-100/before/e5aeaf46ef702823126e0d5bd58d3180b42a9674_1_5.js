function(relation) {
		var query = server
				+ "ProvenanceService?action=removeCausalRelationShip&session="
				+ escape(sessionId) + "&relation=" + escape(relation);
		$.get(query, function(data) {
			//Trim the data.
			data = data.replace(/^\s+|\s+$/g, '');
		});
	}