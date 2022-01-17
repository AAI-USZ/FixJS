function getHighlightedKeyIndexes(divIndex)
{
	var highlighted = new Array();
	
	for(var i = 0; i < allKeys[divIndex].length; i++)
	{
		if(allKeys[divIndex][i].isClicked)
		{
			highlighted.push(i);
		}
	}
	return highlighted;
}