function(layoutName, graphName)
	{

		var params = {type:"layout", name:layoutName, target:graphName}
		console.log('going to send params as: ', params)
		
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

		$.post(tulip_address, {type:'algorithm', parameters:JSON.stringify(params)}, function(data){
			rescaleGraph(data)
			cGraph.nodes(data.nodes)
			cGraph.links(data.links)
			cGraph.edgeBinding()
			graph_drawing = graphDrawing(cGraph, svg)
			graph_drawing.move(cGraph, 0)

		});
	}