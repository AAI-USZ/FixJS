function()
	{
		g.cSvg.selectAll("circle")
			.style('fill', function(){
				var x = d3.select(this).attr('cx');
				var y = d3.select(this).attr('cy');
				var pointArray = []
				if (g.isLasso())
				{
					pointArray = g.pointList
				}else{
					var p0 = g.pointList[0]
					var p1 = g.pointList[g.pointList.length-1]			
					pointArray = [[p0[0], p0[1]],[p0[0], p1[1]], [p1[0], p1[1]], [p1[0], p0[1]]]
				}
			
				if (g.intersect(pointArray, x, y))
					return 'red';
				else
                                {
                                        var e=window.event
                                        //console.log('control pushed ', e.ctrlKey)
                                        if (!e.ctrlKey)
					        return 'blue';
                                }
			});
	}