function(data){
			console.log('creating in tulip, and recieved data: ',data)
			rescaleGraph(data)
			graph_substrate.nodes(data.nodes)
			graph_substrate.links(data.links)
			graph_substrate.edgeBinding()
			g = graphDrawing(graph_substrate, svg_substrate)
			g.move(graph_substrate, 0)
		}