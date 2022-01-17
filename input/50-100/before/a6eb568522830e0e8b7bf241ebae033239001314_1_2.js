function(data){
			console.log("received data after synchronization: ")
			console.log(data);
			//convertLinks(data);
			rescaleGraph(data)
			cGraph.nodes(data.nodes)
			cGraph.links(data.links)
			cGraph.edgeBinding()
			g = graphDrawing(cGraph, svg)
			//g.clear()
			//g.draw()
			g.show(cGraph)
		}