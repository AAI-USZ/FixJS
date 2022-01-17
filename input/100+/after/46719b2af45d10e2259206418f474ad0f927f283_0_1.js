function draw()
{
	clear();
	circle(x, y, 10);
	rect(paddle.x, paddle.y, paddle.width * paddle.resize, paddle.height);
	if(timerOffset == 0)
	{
		if(x + dx + 10 > WIDTH || x + dx - 10 < 0)
			dx = -dx-1;
		if(y + dy - 10 < 0)
			dy = -dy;
		if(y + dy + 10 > HEIGHT)
		{
			playerDie();
		}
		else
		{
			x += dx;
			y += dy;		
		}
		if(left && paddle.x  > 0)
		{
			paddle.x -= paddle.speed;
		}
		else if(right && paddle.x  + paddle.width < WIDTH)
		{
			paddle.x += paddle.speed;
		}
		if(paddleToBallCollide() && dy >0)
		{
			dy *= -1;
		}
	}
	else
	{
		timerOffset--;
	}
		
		
		
		
}