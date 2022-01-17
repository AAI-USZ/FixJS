function createObstacles() {
	obstacles = [];
	obstacles.push(createBox(0,0,5,CANVAS_HEIGHT));
	obstacles.push(createBox(CANVAS_WIDTH-5,0,5,CANVAS_HEIGHT));
	obstacles.push(createBox(0,0,CANVAS_WIDTH,5));
	obstacles.push(createBox(0,CANVAS_HEIGHT-5,CANVAS_WIDTH,5));
	obstacles.push(createBox(0,CANVAS_HEIGHT-70,70,70));
	obstacles.push(createBox(CANVAS_WIDTH-90,CANVAS_HEIGHT-90,90,90));
	obstacles.push(createBox(200,0,110,60));
	obstacles.push(createBox(160,180,110,60));
	obstacles.push(createBox(300,400,70,100));
	obstacles.push(createBox(CANVAS_WIDTH-40,150,40,300));
	obstacles.push(createBox(0,200,30,200));
	obstacles.push(createBox(150,350,80,80));
}