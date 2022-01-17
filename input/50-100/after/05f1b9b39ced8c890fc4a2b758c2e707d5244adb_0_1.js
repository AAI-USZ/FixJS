function nextLevel(){
	currentLevel++;
	$('#level').html(currentLevel+1);
	x = 150;
	y = 150;
	paddle.x = (WIDTH-paddle.width)/2;
	paddle.y = HEIGHT-paddle.height-10;
	initBricks();

}