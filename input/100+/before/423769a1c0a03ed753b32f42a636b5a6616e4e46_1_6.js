function(e)
	{
                if(g.isResizing)
                {
                        
                        var p0 = g.pointList[0]
                        var p1 = g.pointList[g.pointList.length-1]

                        var current = [e[0], e[1]]
                        g.resizeRectangleEvent(current, p0, p1)
                        
                }

		if (! g.started || g.canMove) return;
		var prevPoint = g.pointList[g.pointList.length-1];
		var newPoint = [e[0], e[1]];
		//console.log(g.pointList, '/', prevPoint, '/', newPoint);

		g.group.data(g.pointList).append("path")
			.attr("class", "brush")
			.attr("d", function() { return "M"+prevPoint[0]+" "+prevPoint[1] +" L"+newPoint[0]+" "+newPoint[1]; })
			.style("stroke", "gray")
			.style("stroke-width", function(d) { return 1;}) //Math.sqrt(d.value); })		

		//g.pointList.push([e[0], e[1]]);
		g.updateDistance(newPoint)

		g.group.selectAll("rect.brush").data([1]).exit().remove()
		if (! g.isLasso())
		{
			var p0 = g.pointList[0]
			var p1 = g.pointList[g.pointList.length-1]

			//console.log("#######################################################################################################lasso");
			g.group.append("rect")
				.data([1])
				.attr("class","brush")
				.attr("x", Math.min(p0[0], p1[0]))
				.attr("y", Math.min(p0[1], p1[1]))
				.attr("width", Math.abs(p0[0]-p1[0]))
				.attr("height", Math.abs(p0[1]-p1[1]))
				.style("fill", "black")
				.style("fill-opacity", .125)
		}			
	}
