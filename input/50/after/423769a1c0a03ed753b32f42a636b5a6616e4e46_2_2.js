function(data){
			rescaleGraph(data)
			cGraph.nodes(data.nodes)
			cGraph.links(data.links)
			cGraph.edgeBinding()
			graph_drawing = graphDrawing(cGraph, svg)
			graph_drawing.move(cGraph, 0)

		}