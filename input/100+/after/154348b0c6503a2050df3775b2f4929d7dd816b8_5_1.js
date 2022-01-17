function getDistanceToObstacle(state, obstacles) {
	var statePoint = {x:state[0],y:state[1]};
	var stateLine = createLineFromVector(statePoint, state[2]);
	
	var minDist = DIST_SENSOR_MAX;
	var closestPoint = gdo.getDist({p:statePoint,theta:state[2]}, minDist);

	if (closestPoint != null) {
		return euclidDist(statePoint, closestPoint);
	} else {
		return minDist;
	}
	/*
	var intersectList = [];
	for(var i = 0; i < obstacles.length; i++) {
		var lines = obstacles[i].lines;
		for(var j = 0; j < lines.length; j++) {
			var intersectPoint = getLineIntersection(lines[j], stateLine);
			if(intersectPoint != false)
				intersectList.push(intersectPoint);
		}
	}
	
	var minDist = DIST_SENSOR_MAX;
	var closestPoint = null;
	for(var i = 0; i < intersectList.length; i++) {
		var d = euclidDist(statePoint, intersectList[i]);
		if (d < minDist) {
			minDist = d;
			closestPoint = intersectList[i];
		}
	}
	
	if (closestPoint != null) {
		return minDist;
	} else {
		return null;
	}
	*/
}