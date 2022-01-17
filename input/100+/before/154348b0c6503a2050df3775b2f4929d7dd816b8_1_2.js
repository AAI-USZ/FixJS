function repaint() {
	//var start = new Date().getTime();
	
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	var ctx = makeContextTramp(context, baseState, robotState, firstPerson);
	
	// clear the background
	ctx.fillStyle = "lightblue";
	ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
	
	if(blackTape)
		drawBlackTape(ctx, blackTape);
	drawObstacles(ctx, obstacles);	
	if (particleVectors.length > 1)
		drawVectors(ctx, particleVectors);
	drawRobot(ctx, robotState);
	if (particleVectors.length == 1)
		drawVectors(ctx, particleVectors);
	drawDistSensor(ctx, robotState);
	drawStateInfo(ctx, robotState);
	
	//var end = new Date().getTime();
	//console.log(end-start);
}