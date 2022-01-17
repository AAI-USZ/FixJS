function handleComplete() 
{
	for(var i = 0; i<assets.length; i++) 
	{
		var item = assets[i];
		
		if (item.type == PreloadJS.IMAGE) 
		{
			if ( item.id == "sky" )
			{
				sky = new Shape(new Graphics().beginBitmapFill(item.result).drawRect(0,0,canvas.width,5394));
			}
			else
			{
				item.bmp = new Bitmap(item.result);
			}
		}
	}

	SM.SetStateByName( "menu" )
}