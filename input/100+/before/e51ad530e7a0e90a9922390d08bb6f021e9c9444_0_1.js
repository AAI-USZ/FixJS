function()
	{

		var h = g.svg.attr("height")
		var w = g.svg.attr("width")
		var buttonWidth = 131
		
		var xScale = d3.scale.linear().range([buttonWidth, w])
		var yScale = d3.scale.linear().range([0,h])

		console.log("svg element: ",g.svg, w, h)
		var node = g.svg.selectAll("g.node")

		g.svg.append("g")
		    .attr("class", "brush")
		    .call(d3.svg.brush().x(xScale).y(yScale)
		    .on("brushstart", brushstart)
		    .on("brush", brushmove)
		    .on("brushend", brushend))
		    .style('stroke', 'black')
		    .style('stroke-width', 2)
		    .style('fill-opacity', .125)
		    .style('shape-rendering', 'crispEdges')



		function brushstart() {
		  g.svg.classed("selecting", true);
		}

		function brushmove() {
		  var e = d3.event.target.extent();
		  node.classed("selected", function(d) {
			//console.log('object d ',d);
			//console.log('pos (',e,') against (',d.x/w,',',d.y/h);
		    wNorm = w - buttonWidth
		    d.selected = e[0][0] <= (d.x-buttonWidth+1)/wNorm && (d.x-buttonWidth+1)/wNorm <= e[1][0]
			&& e[0][1] <= d.y/h && d.y/h <= e[1][1];
		    return d.selected;
		  }).select("circle.node").style('fill', function(d){
			if (d.selected)
			{return 'red';
			}else{
			return 'steelblue';}
		})
		  
		}

		function brushend() {
		  g.svg.classed("selecting", !d3.event.target.empty());
		}



	}