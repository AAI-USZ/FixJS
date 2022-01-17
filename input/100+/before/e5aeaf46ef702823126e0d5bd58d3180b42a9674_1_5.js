function ProvVisComm(provVis) {
	this.provVis = provVis;
	/**
	 * 
	 * @param data URI of the process
	 * @param title Title of the process
	 * @param className Type of the process
	 */
	this.displayProcess = function(data, title, className) {
		if (title == null)
			title = "Process " + process_counter;
		//Trim the data.
		data = data.replace(/^\s+|\s+$/g, '');
		if (data.lastIndexOf('Error', 0) === 0)
			return;
		provVis.graph.displayEntity(data, title, "Process", className);
		process_counter++;
	};

	/**
	 * 
	 * @param data URI of the agent
	 * @param title Title of the agent
	 * @param className Type of the agent
	 */
	this.displayAgent = function(data, title, className) {
		if (title == null)
			title = "Agent " + agent_counter;
		//Trim the data.
		data = data.replace(/^\s+|\s+$/g, '');
		if (data.lastIndexOf('Error', 0) === 0)
			return;
		provVis.graph.displayEntity(data, title, "Agent", className);
		agent_counter++;
	};

	/**
	 * @param data URI of the artifact
	 * @param title Title of the artifact
	 * @param className Type of the artifact
	 */
	this.displayArtifact = function(data, title, className) {
		if (title == null)
			title = "Artifact " + artifacts_counter;
		//Trim the data.
		data = data.replace(/^\s+|\s+$/g, '');
		if (data.lastIndexOf('Error', 0) === 0)
			return;
		provVis.graph.displayEntity(data, title, "Artifact", className);
		artifacts_counter++;
	};

	/**
	 * Displays new relationship - the required data are taken from selected nodes and selected type of property.
	 * @param data URI of the new relationship.
	 */
	this.displayNewCausalRelationship = function(data) {
		//Trim the data.
		data = data.replace(/^\s+|\s+$/g, '');
		if (data.lastIndexOf('Error', 0) === 0)
			return;
		provVis.graph.displayRelationship(data, selectedEdge.idEdge, selected1.id, selected2.id);
	};

	/**
	 * Creates new session
	 * @param event  = functionto handle new session id
	 * 
	 */
	this.startSession = function(event) {
		var query = server + 'ProvenanceService?action=startSession';
		$.get(query, event);
	};

	/**
	 * Rollbacks given session
	 * @param session
	 * @param event
	 * 
	 */
	this.rollback = function(session, event) {
		var query = server + 'ProvenanceService?action=rollback&session='+ escape(session);
		$.get(query, event);
	};
	/**
	 * Commits given session
	 * @param session
	 * @param event
	 */
	this.commit = function(session, event) {
		var query = server + 'ProvenanceService?action=commit&session='+ escape(session);
		$.get(query, event);
	};

	/**
	 * 
	 * @param className Type of the process
	 */
	this.addProcess = function(className) {
		var title = $("#-title").val();
		var query = server + 'ProvenanceService?action=addProcess&session='+ escape(sessionId);
		if (className != null && className != "") {
			query += "&type=" + escape(className);
		}

		$.get(query, function(data) {
			//Trim the data.
			data = data.replace(/^\s+|\s+$/g, '');
			provVis.comm.displayProcess(data, title, className);
			query = server + 'ProvenanceService?action=addTitle&session='+ escape(sessionId) + '&object=' + escape(data) + '&title='+ escape(title);
			$.get(query, function(data) {
			});
		});
	};

	/**
	 * 
	 * @param className Type of the agent
	 */
	this.addAgent = function(className) {
		var title = $("#-title").val();
		var query = server + 'ProvenanceService?action=addAgent&session='+ escape(sessionId);
		if (className != null && className != "") {
			query += "&type=" + escape(className);
		}
		$.get(query, function(data) {
			//Trim the data.
			data = data.replace(/^\s+|\s+$/g, '');
			provVis.comm.displayAgent(data, title, className);
			query = server + 'ProvenanceService?action=addTitle&session='+ escape(sessionId) + '&object=' + escape(data) + '&title='+ escape(title);
			$.get(query, function(data) {
			});
		});
	};

	/**
	 * 
	 * @param className Type of the artifact
	 */
	this.addArtifact = function(className) {
		var title = $("#-title").val();
		var query = server + 'ProvenanceService?action=addArtifact&session='+ escape(sessionId);
		if (className != null && className != "") {
			query += "&type=" + escape(className);
		}
		$.get(query, function(data) {
			//Trim the data.
			data = data.replace(/^\s+|\s+$/g, '');
			provVis.comm.displayArtifact(data, title, className);
			query = server + 'ProvenanceService?action=addTitle&session='+ escape(sessionId) + '&object=' + escape(data) + '&title='
					+ escape(title);
			$.get(query, function(data) {
			});
		});
	};

	/**
	 * 
	 * @param uri URI of the resource
	 * @param className Type of the resource
	 * @param title Title of the resource
	 */
	this.addExistingResource = function(uri, className, title) {
		var query = server
				+ 'ProvenanceService?action=addExistingResource&session='+ escape(sessionId) + '&resource=' + escape(uri) + '&type='+ escape(className);
		if (title != null && title != "") {
			query += "&title=" + escape(title);
		}
		$.get(query, function(data) {
			query = server + 'ProvenanceService?action=getShape&type='+ escape(className);
			$.get(query, function(data) {
				provVis.graph.displayEntity(uri, title, data, className);
			});
		});
	};

	/**
	 * Adds causal relationship. The values are taken from UI.
	 * 
	 * @param from The start of the edge
	 * @param to The end of the edge
	 * @param relation The type of the relationship
	 */
	this.addCausalRelationship = function(from, to, relation) {
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
	};

	/**
	 * Adds session to the service.
	 */
	this.addSession = function() {
		var query = server + "ProvenanceService?action=startSession";
		$.get(query, function(data) {
			//Trim the data.
			data = data.replace(/^\s+|\s+$/g, '');
			sessionId = data;
		});

	};

	/**
	 * 
	 * @param relation URI of the relation.
	 */
	this.removeCausalRelationship = function(relation) {
		var query = server
				+ "ProvenanceService?action=removeCausalRelationShip&session="
				+ escape(sessionId) + "&relation=" + escape(relation);
		$.get(query, function(data) {
			//Trim the data.
			data = data.replace(/^\s+|\s+$/g, '');
		});
	};

	/**
	 * @param node URI of the node.
	 */
	this.removeNode = function(node) {
		var query = server + "ProvenanceService?action=removeNode&session="
				+ escape(sessionId) + "&node=" + escape(node);
		$.get(query, function(data) {
			//Trim the data.
			data = data.replace(/^\s+|\s+$/g, '');
		});
	};
}