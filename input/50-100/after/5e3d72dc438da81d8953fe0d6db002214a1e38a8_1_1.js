function(dx, dy)
		{

			// check for collisions
			if (x > -1 && x < 32 && y > -1 && y < 32)
			{

				// xxx the map data comes in with x and y swapped
				var tileType = dd.levelMap[x+dx][y+dy];
				
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