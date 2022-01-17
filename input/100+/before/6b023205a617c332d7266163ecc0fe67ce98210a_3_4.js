function(floatAlgorithmName, graphName)
	{

		var params = {type:"float", name:floatAlgorithmName, target:graphName}

		cGraph = graph_substrate
		svg = svg_substrate
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
			graph_drawing.resize(cGraph, 0)

		});
	}