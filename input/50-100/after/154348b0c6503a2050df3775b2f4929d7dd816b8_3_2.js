function randomDistribution(num, obstacles) {
	var list = [];
	for(var i = 0; i < num; i++) {
		var particle = null;
		while(particle == null || !stateIsValid(particle, obstacles)) {
			particle = createState(
							Math.random()*CANVAS_WIDTH,
							Math.random()*CANVAS_HEIGHT,
							Math.random()*2*Math.PI
							);
		}
		list.push(particle);
	}
	return list;
}