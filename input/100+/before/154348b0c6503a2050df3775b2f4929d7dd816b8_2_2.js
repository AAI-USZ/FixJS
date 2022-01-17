function drawStateInfo(g2, state) {
	g2.fillStyle = "darkBlue";
	g2.font = "bold 1em courier new"; 
	g2.textalign = "right"; 
	
	g2.fillText("Peripherals", 10, 15); 
	g2.fillText("left motor:  "+round4(vel1), 10, 40);
	g2.fillText("right motor: "+round4(vel2), 10, 60);
	g2.fillText("left encoder:  "+Math.round(state.totalw1), 10, 80);
	g2.fillText("right encoder: "+Math.round(state.totalw2), 10, 100);
	g2.fillText("line: "+state.lineSensorText(), 10, 120);
	g2.fillText("left IR:  "+Math.round(state.distSensor[0].dist), 10, 140);
	g2.fillText("front IR: "+Math.round(state.distSensor[1].dist), 10, 160);
	g2.fillText("right IR: "+Math.round(state.distSensor[2].dist), 10, 180);
	
	g2.fillText("Controls", CANVAS_WIDTH-180, 15); 
	g2.fillText("left motor:  e/d", CANVAS_WIDTH-180, 40);
	g2.fillText("right motor: r/f", CANVAS_WIDTH-180, 60);
	g2.fillText("line following: a", CANVAS_WIDTH-180, 80);
	g2.fillText("wall following: s", CANVAS_WIDTH-180, 100);
	g2.fillText("custom program: w", CANVAS_WIDTH-180, 120);
	g2.fillText("toggle viewer:  g", CANVAS_WIDTH-180, 140);
	g2.fillText("show tracking:  t", CANVAS_WIDTH-180, 160);
	g2.fillText("stop: space", CANVAS_WIDTH-180, 180);
}