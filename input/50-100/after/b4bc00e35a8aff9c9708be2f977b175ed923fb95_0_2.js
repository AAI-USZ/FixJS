function()
		{
			if(exploding) return;

			var _bName = "Bullet_" + shooter.getShape().name + "_" + rndInt(1,90000);

			if(bShape == null || bShape == undefined)
			{
				bShape = KBullet();
				bShape.id = _bName;
				bShape.setPosition(X,Y);
				BULLETLAYER.add(bShape);
			}
			else if(bShape != null || bShape != undefined)
				bShape.setPosition(X,Y);
		}