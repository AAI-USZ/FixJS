function rectToBallCollide(rect)
{
	if(x + 10 > rect.x && x - 10 < rect.x + rect.width &&
	y + 10 > rect.y && y - 10 < rect.y + rect.height)
		return true;
	return false;
}