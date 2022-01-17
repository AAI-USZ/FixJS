function()
		{
			if(bShape == null || bShape == undefined)
			{
				bShape = KBullet();
				bShape.setPosition(X,Y);
				LAYER.add(bShape);
			}
			else if(bShape != null || bShape != undefined)
				bShape.setPosition(X,Y);
		}