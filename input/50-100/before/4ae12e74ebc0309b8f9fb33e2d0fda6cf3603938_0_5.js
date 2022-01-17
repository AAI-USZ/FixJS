function render(){

	// Draw Bricks
	for(var i = 0; i < bricks.length; i++){
		ctx.fillStyle = bricks[i].color;
		ctx.fillRect(bricks[i].x, bricks[i].y, bricks[i].width, bricks[i].height);
	}

	// Update Score
	$('#score').html(score);

	// Update Lives
	$('#lives').html(lives);
}