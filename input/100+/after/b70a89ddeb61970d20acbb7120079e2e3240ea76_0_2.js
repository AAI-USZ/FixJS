function checkSquare(square, stateLine, statePoint, maxdist, oldPoint) {
	var intersectionPoints = [];
	for(var i = 0; i < square.edges.length; i++) {
		var p = getLineIntersection(square.edges[i], stateLine)
		if(p != false && p != null)
			intersectionPoints.push(p);
	}
	
	//console.log(square.row+","+square.col+": "+intersectionPoints.length);
	
	if (intersectionPoints.length == 0)
		return null;
	
	var mindist = maxdist;
	var closestPoint = null;
	for(var i = 0; i < intersectionPoints.length; i++) {
		var dist = euclidDist(statePoint, intersectionPoints[i]);
		if(dist < mindist) {
			mindist = dist;
			closestPoint = intersectionPoints[i];
		}
	}
	
	return closestPoint;
}