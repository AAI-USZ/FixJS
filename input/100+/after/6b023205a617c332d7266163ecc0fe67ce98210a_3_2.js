function(json, graphName)
	{
		var cGraph = null
		var svg = null

                if (graphName == 'substrate')
		{	
		        cGraph = graph_substrate
		        svg = svg_substrate
                }

		if (graphName == 'catalyst')
		{	
			cGraph = graph_catalyst
			svg = svg_catalyst
		}

		$.post(tulip_address, { type:"update", graph:json, target:graphName }, function(data){
			cGraph.nodes(data.nodes)
			cGraph.links(data.links)
			cGraph.edgeBinding()
			graph_drawing = graphDrawing(cGraph, svg)
			graph_drawing.exit(cGraph, 0)

			
		});

	}