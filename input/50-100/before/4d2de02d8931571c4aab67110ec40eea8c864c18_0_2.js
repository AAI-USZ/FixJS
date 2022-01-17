function getClickedKey(x,y)
{
	alert("x:" + x + " y:" + y);

	var isClicked = testClickedKey(blackKeys,x,y);
	
	if(!isClicked)
	{
		isClicked = testClickedKey(whiteKeys,x,y);
	}
	
	return isClicked;
}