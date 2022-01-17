function(data){
			console.log("received data after analysis:")
			console.log(data);
			//convertLinks(data);
			rescaleGraph(data)
			graph_catalyst.nodes(data.nodes)
			graph_catalyst.links(data.links)
			graph_catalyst.edgeBinding()
			g = graphDrawing(graph_catalyst, svg_catalyst)
			g.clear()
			g.draw()
		}