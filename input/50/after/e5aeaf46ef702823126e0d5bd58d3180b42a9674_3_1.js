function(data){

		data = data.replace(/^\s+|\s+$/g, ''); 

		provVis.comm.sessionId = data;

		provVis.graph.provenanceEditable = true;

		provVis.graph.checkEditing();

	}