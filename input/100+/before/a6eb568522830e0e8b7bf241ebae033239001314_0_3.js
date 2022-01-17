function(e)
	{
		if (! g.started || g.canMove) return;
		var prevPoint = g.pointList[g.pointList.length-1];
		var newPoint = [e[0], e[1]];
		//console.log(g.pointList, '/', prevPoint, '/', newPoint);
		g.group.data(g.pointList).append("path")
			.attr("class", "brush")
			.attr("d", function() { return "M"+prevPoint[0]+" "+prevPoint[1] +" L"+newPoint[0]+" "+newPoint[1]; })
			.style("stroke", "gray")
			.style("stroke-width", function(d) { return 1;}) //Math.sqrt(d.value); })
		
		g.updateDistance(newPoint)
		
		
		if (g.isLasso())
		{
			prevPoint = g.pointList[0];
			g.group.data(g.pointList).append("path")
				.attr("class", "brush")
				.attr("d", function() { return "M"+newPoint[0]+" "+newPoint[1] +" L"+prevPoint[0]+" "+prevPoint[1]; })
				.style("stroke", "gray")
				.style("stroke-width", function(d) { return 1;}) //Math.sqrt(d.value); })
			g.pointList.push([prevPoint[0], prevPoint[1]]);
			var strPointList = ""
			for (i=0; i<g.pointList.length; i++)
			{
				var p = g.pointList[i]
				strPointList += p[0]+','+p[1]+' '
			}

			g.group.append("polygon").data(g.pointList)
				.attr("class", "brush")
				.attr("points", strPointList)
				.attr("style","fill:black;stroke:purple;stroke-width:2;fill-rule:evenodd;fill-opacity:.125")
		}else{			var p0 = g.pointList[0]
			var p1 = g.pointList[g.pointList.length-1]

			g.group.append("rect")
				.data([1])
				.attr("class","view")
				.attr("x", Math.min(p0[0], p1[0]))
				.attr("y", Math.min(p0[1], p1[1]))
				.attr("width", Math.abs(p0[0]-p1[0]))
				.attr("height", Math.abs(p0[1]-p1[1]))
				.style("fill", "black")
				.style("fill-opacity", .125)
				.style("stroke", "purple")
				.style("stroke-width",2)
			//g.pointList = [[p0[0], p0[1]],[p0[0], p1[1]], [p1[0], p1[1]], [p1[0], p0[1]]]
			//g.group.data(g.pointList)

		}

		g.checkIntersect()		

		g.cSvg.selectAll("text")
			.attr('unselectable', 'off')
			.style('-moz-user-select','undefined')
		        .style('-webkit-user-select','undefined')
		        .style('user-select','undefined')
		        .style('-ms-user-select','undefined')

		g.started = false;
		g.group.selectAll("rect.brush").data([1]).exit().remove()
		g.cSvg.selectAll("path.brush").data(g.pointList).remove().exit()
		
	}
