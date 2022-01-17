function(state, maxdist) {
			state.theta = cutAngle(state.theta);
			var stateLine = createLineFromVector(state.p, state.theta);
			var state_square = {state:state, square:this.getSquare(state.p)};
			var point = null;
			while(point == null && state_square != null) {
				state_square.square.on = true;
				point = checkSquare(state_square.square, stateLine, state.p, maxdist);
				var info = moveToNextBorder(state_square);
				state_square = this.toNextStateSquare( info, state_square);
			}
			return point;
		}