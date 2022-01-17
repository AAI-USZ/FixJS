function(target)
	{
		var svg = null
		var graph = null

		if (target == "catalyst")
		{
			svg = svg_catalyst
			graph = graph_catalyst			
		}
	
		if (target == "substrate")
		{
			svg = svg_substrate
			graph = graph_substrate
		}
			
		if (!target)
			return

		var h = svg.attr("height")
		var w = svg.attr("width")
		var buttonWidth = 131
		
		var xScale = d3.scale.linear().range([buttonWidth, w])
		var yScale = d3.scale.linear().range([0,h])

		console.log("svg element: ",svg, w, h)
		

		var brush = svg.append("g")
		    .attr("class", "brush"+target)
		    .call(d3.svg.brush().x(xScale).y(yScale)
		    .on("brushstart", brushstart)
		    .on("brush", brushmove)
		    .on("brushend", brushend))
		    .style('stroke', 'black')
		    .style('stroke-width', 2)
		    .style('fill-opacity', .125)
		    .style('shape-rendering', 'crispEdges')



		function brushstart() {
		  svg.classed("selecting", true);
		}

		var prevSelList = [];

		function brushmove() {
		  var e = d3.event.target.extent();
		  var node = svg.selectAll("g.node")
		  var selList = []
		  node.classed("selected", function(d) {
			//console.log('object d ',d);
			//console.log('pos (',e,') against (',d.x/w,',',d.y/h);
		    wNorm = w - buttonWidth
		    d.selected = e[0][0] <= (d.x-buttonWidth+1)/wNorm && (d.x-buttonWidth+1)/wNorm <= e[1][0]
			&& e[0][1] <= d.y/h && d.y/h <= e[1][1];
		    return d.selected;
		  }).select("circle.node").style('fill', function(d){
			if (d.selected)
			{ selList.push(d.baseID); return 'red';}
			return 'steelblue';
		})

		selList.sort()
		if(selList.length>0)
		{	
			if(selList.length == prevSelList.length)
			{
				var i = 0;
				var iMax = selList.length;
				while(i<iMax && selList[i] == prevSelList[i])
					i++;
				if (i != iMax)
				{
					prevSelList.length = 0
					prevSelList = selList.slice(0);
					syncGraph(getSelection(target), target)
				}
			}else{
					
					prevSelList.length = 0
					prevSelList = selList.slice(0);
					syncGraph(getSelection(target), target)
			}
		}
				
			
		
		
		  //syncGraph(getSelection(target), target)
		//console.log(nbSelected, 'elements selected')
		}

		function brushend() {
		  svg.classed("selecting", !d3.event.target.empty());
		}



	}