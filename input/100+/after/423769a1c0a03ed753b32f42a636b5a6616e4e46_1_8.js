function()
	{
		__g.cSvg.selectAll("circle")
			.style('fill', function(){
				var x = d3.select(this).attr('cx');
				var y = d3.select(this).attr('cy');
				var pointArray = []
				if (__g.isLasso())
				{
					pointArray = __g.pointList
				}else{
					var p0 = __g.pointList[0]
					var p1 = __g.pointList[__g.pointList.length-1]			
					pointArray = [[p0[0], p0[1]],[p0[0], p1[1]], [p1[0], p1[1]], [p1[0], p0[1]]]
				}
			
				if (__g.intersect(pointArray, x, y))
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