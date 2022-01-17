f		level			= jQuery.parseJSON($('#levelCode').val());
		level.cells 	= [];
		level.sprites	= {};

		//$('#gameContainer').children('div').children().each(function() {
		function processCell(elm) {
			var id = $(elm).attr('id');

			if (id != undefined) {
				var tileId = $(elm).css('background-image').replace('.png)', '').replace('url('+window.location+'ressources/levels/tiles/', '');
		
				var img = $(elm).find('img');
				var sprite = '';
				
				if (img.length > 0) {
					sprite = img.attr('src').replace('.png', '').replace('./ressources/levels/sprites/', '');
					console.log(sprite);
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
					accessible: ($(elm).css('opacity') == 1) ? true : false
				});

				id = id.replace('cell_', '').split('_');

				var cell = level.cells[parseInt(id[1]) * level.dimensions.width + parseInt(id[0])];
				if (cell == undefined) cell = level.cells[0];

				if (!cell.accessible) {
					$(elm).css('opacity', '0.3');	
				}
			}
		};
		
		for (var y = 0; y < level.dimensions.height; y++) {
			for (var x = 0; x < level.dimensions.width; x++) {
				var element = $('#cell_'+x+'_'+y);
				processCell(element);				
			}
		}
		
		addLevelLinks();
		
		var encoded = $.toJSON( level );
		
		$('#levelCode').val(encoded);
	}
