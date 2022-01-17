function(data)
	{
		rescaleGraph(data)
		console.log("the data to store:", data);
		graph_substrate.nodes(data.nodes)
		graph_substrate.links(data.links)
		graph_substrate.edgeBinding()
		//console.log("graph_substrate", graph_substrate)

		var g = graphDrawing(graph_substrate, svg_substrate)
		g.draw()
		
		/*
		jsonGraph.nodes().forEach(function(d){d.x -= 10})
		g.move(jsonGraph, 0)

		jsonGraph.nodes().forEach(function(d){d.y = 50})
		g.move(jsonGraph, 0)
		*/
		return
	}