function(cPoint)
	{
		if (g.pointList.length > 0)
		{
			fPoint = g.pointList[0]
			lPoint = g.pointList[g.pointList.length-1]
			g.totalDistanceAlongDrag += Math.sqrt(((cPoint[0]-lPoint[0])*(cPoint[0]-lPoint[0])) + ((cPoint[1]-lPoint[1])*(cPoint[1]-lPoint[1])))
			g.distanceFromStartToEnd = Math.sqrt(((cPoint[0]-fPoint[0])*(cPoint[0]-fPoint[0])) + ((cPoint[1]-fPoint[1])*(cPoint[1]-fPoint[1]))			)
		}
		g.pointList.push([cPoint[0], cPoint[1]]);
	}