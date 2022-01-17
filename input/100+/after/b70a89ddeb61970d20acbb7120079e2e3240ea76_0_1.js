function(state, maxdist) {
			state.theta = cutAngle(state.theta);
			var stateLine = createLineFromVector(state.p, state.theta);
			var state_square = {state:state, square:this.getSquare(state.p)};
			var closestPoint = null;
			while(state_square != null) {
				state_square.square.on = true;
				point = checkSquare(state_square.square, stateLine, state.p, maxdist);
				if (point != null) {
					closestPoint = point;
					maxdist = euclidDist(state.p, point);
				}
				var info = moveToNextBorder(state_square);
				state_square = this.toNextStateSquare(info, state_square);
			}
			if(state_square != null)
				state_square.square.on = true;
			return closestPoint;
		}