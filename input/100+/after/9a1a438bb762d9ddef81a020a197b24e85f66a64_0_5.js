function processCell(elm) {
			var id = $(elm).attr('id');

			if (id != undefined) {
				var tileId = $(elm).css('background-image').replace('.png)', '').split('/'); //.replace('url('+window.location+'ressources/levels/tiles/', '');
				tileId = tileId[tileId.length -1];

				var img = $(elm).find('img:not(.na)');
				var sprite = '';
				
				if (img.length > 0) {
					sprite = img.attr('src').replace('.png', '').replace('./ressources/levels/sprites/', '');
					level.sprites['s_'+sprite] = {
						width: 	img.width(),
						height: img.height(),
						x: 		-parseInt(img.css('left')),
						y:		-parseInt(img.css('top'))
					}
				}

				level.cells.push({
					background: tileId,
					sprite:		sprite,
					accessible: ($(elm).children('.na').length == 0) ? true : false
				});

				id = id.replace('cell_', '').split('_');

				var cell = level.cells[parseInt(id[1]) * level.dimensions.width + parseInt(id[0])];
				if (cell == undefined) cell = level.cells[0];

				/*if (!cell.accessible) {
					$(elm).css('opacity', '0.3');	
				}*/
			}
		}