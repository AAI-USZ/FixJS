function makeEdgeSquares(obstacles, boardWidth, boardHeight, divider) {
	var edgeSquares = new Array(divider),
		squareWidth = boardWidth/divider,
		squareHeight = boardHeight/divider;
	
	for(var r = 0; r < divider; r++) {
		edgeSquares[r] = new Array(divider);
		for(var c = 0; c < divider; c++) {
			var square = makeSquare(r, c, squareWidth, squareHeight);
			for(var i = 0; i < square.poly.lines.length; i++) {
				for(var j = 0; j < obstacles.length; j++) {
					for(var k = 0; k < obstacles[j].lines.length; k++) {
						if (linesIntersect(square.poly.lines[i], obstacles[j].lines[k])
							|| (pointInPoly(obstacles[j].lines[k].p1, square.poly)
								&& pointInPoly(obstacles[j].lines[k].p2, square.poly))) {
							square.edges.push(obstacles[j].lines[k]);
						}
					}
				}
			}
			edgeSquares[r][c] = square;
		}
	}
	
	return edgeSquares;
}