function drawStateInfo(g2, state) {
	g2.fillStyle = "darkBlue";
	g2.font = "bold 1em courier new"; 
	g2.textalign = "right"; 
	
	g2.fillText("Peripherals", 10, 15); 
	g2.fillText("motors: "+round4(vel2)+" ; "+round4(vel1), 10, 40);
	g2.fillText("encoders: "+Math.round(state.totalw2)+" ; "+Math.round(state.totalw1), 10, 60);
	g2.fillText("line: "+state.lineSensorText(), 10, 80);
	g2.fillText("rotating: "+Math.round(state.distSensor[1].dist), 10, 100);
	g2.fillText("left/right: "+Math.round(state.distSensor[0].dist)+" ; "
		+Math.round(state.distSensor[2].dist), 10, 120);
	
	g2.fillText("Controls", CANVAS_WIDTH-180, 15); 
	g2.fillText("move: w/a/s/d", CANVAS_WIDTH-180, 40);
	g2.fillText("line following: z", CANVAS_WIDTH-180, 60);
	g2.fillText("wall following: x", CANVAS_WIDTH-180, 80);
	g2.fillText("custom program: c", CANVAS_WIDTH-180, 100);
	g2.fillText("toggle viewer:  e", CANVAS_WIDTH-180, 120);
	g2.fillText("show tracking:  q", CANVAS_WIDTH-180, 140);
	g2.fillText("stop: space", CANVAS_WIDTH-180, 160);
}