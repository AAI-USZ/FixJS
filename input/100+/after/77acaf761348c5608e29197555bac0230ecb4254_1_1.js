function(_graph, dTime)
	{
		//g.cGraph = _graph

		var node = g.svg.selectAll("g.node")
			.select("circle.node")
			.style('fill', 'steelblue')
			.attr('r', 5)

		var node = g.svg.selectAll("g.node")
			//.data(g.cGraph.nodes(),function(d){return d.baseID})
                        .data(_graph.nodes(),function(d){return d.baseID})
			.transition().delay(500)
		node.select("circle.node")
			.attr("r", function(d){return 10})

		var node2 = g.svg.selectAll("g.node")
			.data(_graph.nodes(),function(d){return d.baseID})
			.transition().delay(1000)
		node.select("circle.node")
			.style("fill", "pink")
			//.attr("transform", function(d) { console.log(d); return "scale(" + d.viewMetric + "," + d.viewMetric + ")"; })
                g.svg.selectAll("g.node")
			.data(g.cGraph.nodes(),function(d){return d.baseID})			

	}