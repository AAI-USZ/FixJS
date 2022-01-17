function(data) {
			//Trim the data.
			data = data.replace(/^\s+|\s+$/g, '');
			provVis.comm.displayArtifact(data, title, className);
			query = server + 'ProvenanceService?action=addTitle&session='+ escape(sessionId) + '&object=' + escape(data) + '&title='
					+ escape(title);
			$.get(query, function(data) {
			});
		}