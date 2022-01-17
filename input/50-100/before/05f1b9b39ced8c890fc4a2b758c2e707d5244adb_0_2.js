function removeBrick()
{

	//The ball is too low to be near any of the bricks
	if(y < closeBrick)
		return;
	for(var i = 0; i < bricks.length; i++){
		if(rectToBallCollide(bricks[i]))
		{
			addScore(bricks[i].score);
			bricks.splice(i, 1);
			dy *= -1;
			return;
		}
	}

}