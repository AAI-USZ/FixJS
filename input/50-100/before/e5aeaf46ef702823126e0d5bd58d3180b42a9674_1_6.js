function(node) {
		var query = server + "ProvenanceService?action=removeNode&session="
				+ escape(sessionId) + "&node=" + escape(node);
		$.get(query, function(data) {
			//Trim the data.
			data = data.replace(/^\s+|\s+$/g, '');
		});
	}