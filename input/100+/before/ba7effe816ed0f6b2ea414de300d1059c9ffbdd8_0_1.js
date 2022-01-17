function drawHexUnit(c, x0, y0, unit, drawIndicators)
	{
		if (unit === null)
			return;

		image = imgUnits[unit.getIcon()];
		if (image) 
		{
			// Units have 15 possible orientations there are 9 sprites each ~80x50 in 1 row
			// to get the rest of the orientations the sprite must be mirrored
			var mirror = false;
			var imagew = image.width/9; //Some images have bigger width
			var imageh = image.height;
			//Offset the transparent regions of the unit sprite
			var ix0 = (x0 - imagew/2 + s/2) >> 0;
			var iy0 = (y0 - imageh/2 + r - unitTextHeight) >> 0;
			facing = unit.facing;
			if (facing > 8)
			{
				facing = 16 - facing; 
				mirror = true;
			}
			var imgidx = imagew * facing;
			if (mirror)
			{
				var flip = ix0 + imagew/2;
				c.save();
				c.translate(flip, 0);
				c.scale(-1,1);
				c.translate(-flip,0);
			}
			c.drawImage(image, imgidx , 0, imagew, imageh, ix0, iy0, imagew, imageh);
			if (mirror) c.restore();
		}
			
		if (!drawIndicators) return;
		//TODO performance, consider caching glyphs digits and use drawImage/putImageData
		//Currently fillText and fillRect doubles the rendering time
		
		//Write unit strength in a box below unit
		c.font = unitTextHeight + "px unitInfo, sans-serif";
		var text = "" + unit.strength;
		var tx = (x0 + h/2) >> 0;
		var ty = y0 + 2 * r - (unitTextHeight + 2); //text size + spacing
		var side = unit.player.side;
		var boxWidth = 18;  // c.measureText(text).width + 2 too slow
		if (unit.strength < 10) boxWidth = 9;
		
		c.fillStyle = "black";
		if (side == 1) { c.fillStyle = "green"; }
		c.fillRect(tx, ty, boxWidth, unitTextHeight); 
		
		if (unit.player != map.currentPlayer && unit.player.side == map.currentPlayer.side)
			c.fillStyle = "696969";
		else
			c.fillStyle = "white";
		
		if (unit.hasMoved && unit.player == map.currentPlayer)
			c.fillStyle = "b22222"; //FireBrick
			
		c.fillText(text, tx, ty + 8);

		//draw indicator for unit.hasFired
		if (!unit.hasFired && side == map.currentPlayer.side)
			c.drawImage(imgUnitFire, x0 - 1, y0 + 2 * r - unitTextHeight);
	}