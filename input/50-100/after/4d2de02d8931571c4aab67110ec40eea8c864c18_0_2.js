function getClickedKey(x,y,divIndex)
{
	var isClicked = testClickedKey(blackKeys,x,y,divIndex);
	
	if(!isClicked)
	{
		isClicked = testClickedKey(whiteKeys,x,y,divIndex);
	}
	
	return isClicked;
}