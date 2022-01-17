function(data){
			console.log('creating in tulip, and recieved data: ',data)
			rescaleGraph(data)
			graph_substrate.nodes(data.nodes)
			graph_substrate.links(data.links)
			graph_substrate.edgeBinding()
			graph_drawing = graphDrawing(graph_substrate, svg_substrate)
			graph_drawing.move(graph_substrate, 0)
		}