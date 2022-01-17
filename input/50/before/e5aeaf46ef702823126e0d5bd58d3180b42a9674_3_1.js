function(data){

		data = data.replace(/^\s+|\s+$/g, ''); 

		sessionId = data;

		provVis.graph.provenanceEditable = true;

		provVis.graph.checkEditing();

	}