function() {
			for (var i = 0; i < level.cells.length; i++) {
				if (level.cells[i].sprite != '') {
					var y = Math.floor(i / level.dimensions.width);
					var x = i - y * level.dimensions.width;

					mode = 'sprite';
					currentSprite = {
						image:	level.cells[i].sprite,
						x:		level.sprites['s_'+level.cells[i].sprite].x,
						y:		level.sprites['s_'+level.cells[i].sprite].y
					}
					$('#sprite_'+x+'_'+y).remove();
					changeCell(x, y);				
				}
			}
		}