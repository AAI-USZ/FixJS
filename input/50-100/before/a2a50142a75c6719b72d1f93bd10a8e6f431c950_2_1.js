function stateIsValid(state, obstacles) {
	if(!(state.p.x > 0 && state.p.x < CANVAS_WIDTH && state.p.y > 0 && state.p.y < CANVAS_HEIGHT))
		return false;
	/*
	for(var i = 0; i < obstacles.length; i++) {
		if(pointInPoly(state.p, obstacles[i])) {
			return false;
		}
	}
	*/
	return true;
}