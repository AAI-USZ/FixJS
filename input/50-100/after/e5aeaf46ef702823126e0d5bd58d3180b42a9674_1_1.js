function(data) {
			//Trim the data.
			data = data.replace(/^\s+|\s+$/g, '');
			provVis.comm.displayProcess(data, title, className);
			query = server + 'ProvenanceService?action=addTitle&session='+ escape(this.sessionId) + '&object=' + escape(data) + '&title='+ escape(title);
			$.get(query, function(data) {
			});
		}