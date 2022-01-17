function(graphName)
	{
		cGraph = graph_substrate
		svg = svg_substrate
		if (graphName == 'catalyst')
		{	
			cGraph = graph_catalyst
			svg = svg_catalyst
		}


		console.log("The node selection= ");
		var u = svg.selectAll("g.node.selected").data();

		var toStringify = {};
		toStringify.nodes = new Array();

		for (i=0; i<u.length; i++)
		{
			var node = {};
			node.baseID = u[i].baseID;
			console.log(u[i]);
			toStringify.nodes.push(node);
		}
		console.log(JSON.stringify(toStringify));
		return JSON.stringify(toStringify)
	}