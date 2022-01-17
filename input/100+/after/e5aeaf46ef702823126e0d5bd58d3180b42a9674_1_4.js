function(uri, className, title) {
		var query = server
				+ 'ProvenanceService?action=addExistingResource&session='+ escape(this.sessionId) + '&resource=' + escape(uri) + '&type='+ escape(className);
		if (title != null && title != "") {
			query += "&title=" + escape(title);
		}
		$.get(query, function(data) {
			query = server + 'ProvenanceService?action=getShape&type='+ escape(className);
			$.get(query, function(data) {
				provVis.graph.displayEntity(uri, title, data, className);
			});
		});
	}