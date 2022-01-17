function(cPoint)
	{
		if (__g.pointList.length > 0)
		{
			fPoint = __g.pointList[0]
			lPoint = __g.pointList[__g.pointList.length-1]
			__g.totalDistanceAlongDrag += Math.sqrt(((cPoint[0]-lPoint[0])*(cPoint[0]-lPoint[0])) + ((cPoint[1]-lPoint[1])*(cPoint[1]-lPoint[1])))
			__g.distanceFromStartToEnd = Math.sqrt(((cPoint[0]-fPoint[0])*(cPoint[0]-fPoint[0])) + ((cPoint[1]-fPoint[1])*(cPoint[1]-fPoint[1]))			)
		}
		__g.pointList.push([cPoint[0], cPoint[1]]);
	}