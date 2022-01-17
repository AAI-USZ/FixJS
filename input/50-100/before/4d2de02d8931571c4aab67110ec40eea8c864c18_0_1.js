function getHighlightedKeyIndexes()
{
	var highlighted = [];
	for(var j = 0; j < allKeys.length; j++)
	{
		highlighted[j] = new Array();
		for(var i = 0; i < allKeys[j].length; i++)
		{
			if(allKeys[j][i].isClicked)
			{
				highlighted[j].push(i);
			}
		}
	}
	return highlighted;
}