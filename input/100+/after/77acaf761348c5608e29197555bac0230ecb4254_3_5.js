function(selection, graphName)
	{
		console.log('sending a synchronization request: ', selection)

		var cGraph = null
		var svg = null

                if (graphName == 'substrate')
		{	
		        cGraph = graph_catalyst
		        svg = svg_catalyst
                }

		if (graphName == 'catalyst')
		{	
                        console.log('target is catalyst');
			cGraph = graph_substrate
                        console.log(graph_catalyst.nodes())
			svg = svg_substrate
		}

	

		$.post(tulip_address, {type:'analyse', graph:selection, target:graphName}, function(data){
                        

                        //var oldData = cGraph.nodes();
                        //var selectedID = [];
                        //var selectedNodes = [];
                        //data.nodes.forEach(function(d){selectedID.push(d.baseID);});
                        //console.log("selectedIDs",selectedID);
                        //console.log('cGraph',graphName, cGraph.nodes())
                        //cGraph.nodes().forEach(function(d){if(selectedID.indexOf(d.baseID) > -1) selectedNodes.push(d);});
                        //console.log("Selected Nodes:", selectedNodes);

			console.log("received data after synchronization: ")
			console.log(data);
			//convertLinks(data);
			//rescaleGraph(data)
                        
                        var tempGraph = new graph()
			tempGraph.nodes(data.nodes)
			tempGraph.links(data.links)

			tempGraph.edgeBinding()

			//cGraph.nodes(data.nodes)
			//cGraph.links(data.links)

			//cGraph.edgeBinding()
                        
			var graph_drawing = graphDrawing(cGraph, svg)
                        

			//g.clear()
			//g.draw()
			graph_drawing.show(tempGraph)
			if ('data' in data)
			{
				cohesion_homogeneity = data['data']['cohesion homogeneity'];
				cohesion_intensity = data['data']['cohesion intensity'];
				cohesionCaught();
			}
		});

	}