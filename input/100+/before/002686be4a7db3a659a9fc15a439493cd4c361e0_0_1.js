function(state, maxdist) {
			state.theta = cutAngle(state.theta);
			var state_square = {state:state, square:this.getSquare(state.p)};
			var point = state_square.state.p;
			while(state_square != null) {
				state_square.square.on = true;
				// add in checks for edges
				point = state_square.state.p;
				var info = moveToNextBorder(state_square);
				state_square = this.toNextStateSquare( info, state_square);
			}
			return point;
		}