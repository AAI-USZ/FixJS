function drawGDO(g2, gdo) {
	for(var r = 0; r < gdo.divider; r++) {
		drawLine(g2, {x:0, y:r*gdo.squareHeight}, {x:CANVAS_WIDTH, y:r*gdo.squareHeight});
	}
	
	for(var c = 0; c < gdo.divider; c++) {
		drawLine(g2, {x:c*gdo.squareWidth, y:0}, {x:c*gdo.squareWidth, y:CANVAS_HEIGHT});
	}
	
	for(var r = 0; r < gdo.divider; r++) {
		for(var c = 0; c < gdo.divider; c++) {
			if(gdo.edgeSquares[r][c].on) {
				g2.fillStyle = "white";
				g2.fillRect(c*gdo.squareWidth, r*gdo.squareHeight, gdo.squareWidth, gdo.squareHeight);
				drawLines(g2, gdo.edgeSquares[r][c].edges, r*gdo.divider+c);
			}
			gdo.edgeSquares[r][c].on = false;
		}
	}
}