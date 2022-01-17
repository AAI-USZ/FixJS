function(target)
	{
		if (!target)
			return

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
		
		var myL = lasso(svg);
		var prevSelList = [];

		myL.checkIntersect = function()
		{
			var g = this
			var selList = []
			svg.selectAll("g.node").classed("selected", function(d){
					var x = d.x;
					var y = d.y;
					var pointArray = []
					if (g.isLasso())
					{
						pointArray = g.pointList
					}else{
						var p0 = g.pointList[0]
						var p1 = g.pointList[g.pointList.length-1]			
						pointArray = [[p0[0], p0[1]],[p0[0], p1[1]], [p1[0], p1[1]], [p1[0], p0[1]]]
					}
					d.selected = g.intersect(pointArray, x, y)
					return d.selected

				})
				.select("circle.node").style('fill', function(d){
					
					if (d.selected){
						selList.push(d.baseID)
						return 'red';
					}else
						return 'steelblue';
				});
			
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

		}	


		svg.on("mouseup", function(d){myL.mouseUp(d3.mouse(this))});
		svg.on("mousedown", function(d){myL.mouseDown(d3.mouse(this))});
		svg.on("mousemove", function(d){myL.mouseMove(d3.mouse(this))});

		
	}