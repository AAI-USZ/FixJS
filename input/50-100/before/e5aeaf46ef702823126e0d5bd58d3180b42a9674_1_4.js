function(from, to, relation) {
		//var cause = selected1.id;
		//var effect = selected2.id;
		//var relation = $("#-menu").val();
		/*if($("#-menu").is(':hidden')){
			alert("No relation selected");
			return;			
		}*/
		if (relation == null || relation == "" || relation == "x") {
			alert("No relation selected");
			return;
		}

		var query = server
				+ "ProvenanceService?action=addCausalRelationship&session="+ escape(sessionId) + "&from=" + escape(from) + "&to="+ escape(to) + "&relation=" + escape(relation);
		$.get(query, provVis.comm.displayNewCausalRelationship);
	}