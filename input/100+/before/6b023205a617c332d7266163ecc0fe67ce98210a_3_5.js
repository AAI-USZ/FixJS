function(selection, graphName)
	{
		console.log('sending a synchronization request: ', graphName)

		cGraph = graph_catalyst
		svg = svg_catalyst
		if (graphName == 'catalyst')
		{	
			cGraph = graph_substrate
			svg = svg_substrate
		}

	

		$.post(tulip_address, {type:'analyse', graph:selection, target:graphName}, function(data){
                        
			console.log("received data after synchronization: ")
			console.log(data);
			//convertLinks(data);
			rescaleGraph(data)
                        
			cGraph.nodes(data.nodes)
                        
			cGraph.links(data.links)
			cGraph.edgeBinding()
                        
			graph_drawing = graphDrawing(cGraph, svg)
                        

			//g.clear()
			//g.draw()
			graph_drawing.show(cGraph)
			if ('data' in data)
			{
				cohesion_homogeneity = data['data']['cohesion homogeneity'];
				cohesion_intensity = data['data']['cohesion intensity'];
				cohesionCaught();
			}
		});

	}