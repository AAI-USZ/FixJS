function drawGDO(g2, gdo) {
	for(var r = 0; r < gdo.divider; r++) {
		for(var c = 0; c < gdo.divider; c++) {
			drawLines(g2, gdo.edgeSquares[r][c].edges);
		}
	}
}