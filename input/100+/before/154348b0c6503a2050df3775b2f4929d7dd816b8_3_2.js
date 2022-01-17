function centeredDistribution(num) {
	var list = [];
	for(var i = 0; i < num; i++) {
		var particle = createState(
							(400*Math.random()-200)+CANVAS_WIDTH/2,
							(400*Math.random()-200)+CANVAS_HEIGHT/2,
							Math.random()*2*Math.PI
							);
		list.push(particle);
	}
	return list;
}