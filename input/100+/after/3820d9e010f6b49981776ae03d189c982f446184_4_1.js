function() {
		Engine = new DivEngine();

		level	= jQuery.parseJSON($('#levelCode').val());

		var levels = '';
		for (var i = 0; i < level.cells.length; i++) {
			if (level.cells[i].level != undefined) {
				var y = Math.floor(i / level.dimensions.width);
				var x = i - y * level.dimensions.width;

				levels += x+','+y+','+level.cells[i].level+"\n";
				
			}
		}

		$('#levelLink').val(levels);

		Engine.setup(level);
		
		//cells
		setTimeout(function() {
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
		}, 1000);

		mode = 'tile';
				
		var ctrl	= false;
		var alt		= false;
		var shift	= false;
		var oldClickedTile;
		$(document).keydown(function(e) {
			if (e.ctrlKey) ctrl = true;
			if (e.altKey) alt   = true;
			if (e.shiftKey) shift = true;
		}).keyup(function(e) {
			if (ctrl || alt || shift) createCode();

			ctrl  = false;
			alt   = false;
			shift = false;
		});

		$('#gameContainer').mousedown(function(e) {
			position = $('#gameContainer').children('div').offset();
		}).mousemove(function(e) {
			var mousePosition = CrossBrowser.getMousePosition(e);

			var baseX = mousePosition.left - Game.container.offsetLeft - parseInt(Engine.scene.style.left);
			var baseY = mousePosition.top - Game.container.offsetTop - parseInt(Engine.scene.style.top);

			var clickedTile = Engine.getCoordinates(baseX, baseY);

			if (ctrl || alt || shift) {
				if (oldClickedTile != undefined) {
					if (oldClickedTile.x == clickedTile.x && oldClickedTile.y == clickedTile.y) return;
				}

				oldClickedTile = clickedTile;

				if (shift) changeCell(clickedTile.x, clickedTile.y, e);
				if (ctrl) changeAccessibility(clickedTile.x, clickedTile.y, true);
				if (alt) changeAccessibility(clickedTile.x, clickedTile.y, false);
			}

			$('#cx').text(clickedTile.x);
			$('#cy').text(clickedTile.y);
		}).mouseup(function(e) {
			e.preventDefault();

			var mousePosition = CrossBrowser.getMousePosition(e);

			newPosition = $('#gameContainer').children('div').offset();
			if (newPosition.left != position.left && newPosition.top != position.top) return;

			var baseX = mousePosition.left - Game.container.offsetLeft - parseInt(Engine.scene.style.left);
			var baseY = mousePosition.top - Game.container.offsetTop - parseInt(Engine.scene.style.top);

			var clickedTile = Engine.getCoordinates(baseX, baseY);

			if (!alt && !ctrl) changeCell(clickedTile.x, clickedTile.y, e);
			if (ctrl) changeAccessibility(clickedTile.x, clickedTile.y, true);
			if (alt) changeAccessibility(clickedTile.x, clickedTile.y, false);

			createCode();
		});

		$('#gameContainer').children('div').children().each(function() {
			var id = $(this).attr('id');

			if (id != undefined) {
				id = id.replace('cell_', '').split('_');

				var cell = level.cells[parseInt(id[1]) * level.dimensions.width + parseInt(id[0])];
				if (cell == undefined) cell = level.cells[0];

				if (!cell.accessible) {
					changeAccessibility(parseInt(id[0]), parseInt(id[1]), false);
				}
			}
		});
	}