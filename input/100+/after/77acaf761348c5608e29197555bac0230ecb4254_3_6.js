function()
	{
	  	var params = {type:"analyse"}
	        console.log("starting analysis:",graph_catalyst.nodes(), graph_substrate.nodes())

		$.post(tulip_address, {type:'analyse', target:'substrate'}, function(data){
			console.log("received data after analysis:")
			console.log(data);
			//convertLinks(data);
			rescaleGraph(data)
                        console.log("right before:",graph_catalyst.nodes(), graph_substrate.nodes())
			graph_catalyst.nodes(data.nodes)
                        console.log("right after:",graph_catalyst.nodes(), graph_substrate.nodes())
			graph_catalyst.links(data.links)
			graph_catalyst.edgeBinding()
			graph_drawing = graphDrawing(graph_catalyst, svg_catalyst)
			graph_drawing.clear()
			graph_drawing.draw()
			cohesion_homogeneity = data['data']['cohesion homogeneity']
			cohesion_intensity = data['data']['cohesion intensity']
                        console.log("after analysis:",graph_catalyst.nodes(), graph_substrate.nodes())
			cohesionCaught();
		});

	}