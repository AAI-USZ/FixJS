function(dx, dy)
		{
			// clear the old cell if it's valid
			if (x > -1 && x < 32 && y > -1 && y < 32)
			{
				var tileType = dd.levelMap[y+dy][x+dx];
				var tile = dd.tiles[find_in_array(dd.tiles, 'id', tileType)];
				if (!tile['solid'])
				{
					spriteGrid[x][y] = null;
					
					// update the position
					x += dx;
					y += dy;
				}
			}


			

		}