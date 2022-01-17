function moveToNextBorder(state_square) {
	var state = state_square.state, square = state_square.square;
	var bx = square.bx, by = square.by, bh = square.bh, bw = square.bw,
		sx = state.p.x, sy = state.p.y, theta = state.theta;

	if (theta/(PI/2) == Math.floor(theta/(PI/2))) {
		return gridThetaToResult[theta/(PI/2)](bx,by,bw,bh,sx,sy);
	} else {
		return nongridThetaToResult[Math.floor(theta/(PI/2))](bx,by,bw,bh,sx,sy,theta);
	}
}