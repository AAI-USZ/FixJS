function rectToBallCollide(height, width, rectx, recty)
{
	if(x + 10 > rectx && x - 10 < rectx + width &&
	y + 10 > recty && y - 10 < recty + height)
		return true;
	return false;
}