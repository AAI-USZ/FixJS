function(e)
	{
                //console.log("status",this)
                if(__g.isResizing)
                {
                        
                        var p0 = __g.pointList[0]
                        var p1 = __g.pointList[__g.pointList.length-1]

                        var current = [e[0], e[1]]
                        __g.resizeRectangleEvent(current, p0, p1)
                        
                }

		if (! __g.started || __g.canMove) return;
		var prevPoint = __g.pointList[__g.pointList.length-1];
		var newPoint = [e[0], e[1]];
		//console.log(this.pointList, '/', prevPoint, '/', newPoint);

		__g.group.data(__g.pointList).append("path")
			.attr("class", "brush")
			.attr("d", function() { return "M"+prevPoint[0]+" "+prevPoint[1] +" L"+newPoint[0]+" "+newPoint[1]; })
			.style("stroke", "gray")
			.style("stroke-width", function(d) { return 1;}) //Math.sqrt(d.value); })		

		//__g.pointList.push([e[0], e[1]]);
		__g.updateDistance(newPoint)

		__g.group.selectAll("rect.brush").data([1]).exit().remove()
		if (! __g.isLasso())
		{
			var p0 = __g.pointList[0]
			var p1 = __g.pointList[__g.pointList.length-1]

			//console.log("#######################################################################################################lasso");
			__g.group.append("rect")
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
