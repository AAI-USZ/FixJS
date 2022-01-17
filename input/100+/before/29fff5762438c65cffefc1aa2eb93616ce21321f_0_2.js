function handleComplete() 
{
	for(var i=0;i<assets.length;i++) 
	{
		var item = assets[i]; //loader.getResult(id);
		var id = item.id;
		var result = item.asset;//item.result;
		
		//if (item.type == PreloadJS.IMAGE) {
			//var bmp = new Bitmap(result);
		//}

		switch (id) {
			case "sky":
				// grab canvas width and height for later calculations:
				sky = new Shape(new Graphics().beginBitmapFill(result).drawRect(0,0,canvas.width,5394));
				sky.x=0;
				sky.y=-5394;
		}
	}

	SM.SetStateByName( "menu" )
}