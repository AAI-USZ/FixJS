function makeGDO(obstacles, boardWidth, boardHeight, divider) {
	var squares = makeEdgeSquares(obstacles, boardWidth, boardHeight, divider);
	
	var gdo = {
		divider: divider,
		squareWidth: boardWidth/divider,
		squareHeight: boardHeight/divider,
		boardWidth: boardWidth,
		boardHeight: boardHeight,
		edgeSquares: squares,
		
		getDist: function(state, maxdist) {
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
		},
		
		getSquare: function(p) {
			var row = Math.floor(p.y/this.squareHeight),
				col = Math.floor(p.x/this.squareWidth);
			return squares[row][col];
		},
		
		// expects {p:{x,y},side}, {state,square}
		toNextStateSquare: function(info, state_square) {
			var difs = sideToDifs[info.side];
			var oldRow = state_square.square.row, oldCol = state_square.square.col;
			var newRow = oldRow+difs.rdif, newCol = oldCol+difs.cdif;
			if(newRow < 0 || newRow >= this.divider || newCol < 0 || newCol >= this.divider)
				return null;
			return {
				state:{p:info.p, theta:state_square.state.theta},
				square:squares[newRow][newCol]
			};
		}
	};
	
	return gdo;
}