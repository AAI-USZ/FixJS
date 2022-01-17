function(data)
	{
		rescaleGraph(data)
		console.log("the data to store:", data);
		graph_substrate.nodes(data.nodes)
		graph_substrate.links(data.links)
		graph_substrate.edgeBinding()
		console.log("loading JSON", graph_substrate.nodes(), graph_catalyst.nodes())

		var graph_drawing = graphDrawing(graph_substrate, svg_substrate)
		graph_drawing.draw()
		
		/*
		jsonGraph.nodes().forEach(function(d){d.x -= 10})
		g.move(jsonGraph, 0)

		jsonGraph.nodes().forEach(function(d){d.y = 50})
		g.move(jsonGraph, 0)
		*/
		return
	}