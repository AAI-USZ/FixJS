function criaVetor(xDimensions, yDimensions) {	//	cria vetor bidimensional
	var map = [];
	for (var xLoop=0; xLoop<xDimensions; xLoop++) {
		map[xLoop] = [];
		for (var yLoop=0; yLoop<yDimensions; yLoop++) {
			map[xLoop][yLoop] = "";    // final value for someArray[x][y] goes here
		}
	}
	return map;
}