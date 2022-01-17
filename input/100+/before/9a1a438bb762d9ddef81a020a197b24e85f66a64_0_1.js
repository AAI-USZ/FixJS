function() {
			var id = $(this).attr('id');

			if (id != undefined) {
				id = id.replace('cell_', '').split('_');

				var cell = level.cells[parseInt(id[1]) * level.dimensions.width + parseInt(id[0])];
				if (cell == undefined) cell = level.cells[0];

				if (!cell.accessible) {
					$(this).css('opacity', '0.3');	
				}
			}
		}