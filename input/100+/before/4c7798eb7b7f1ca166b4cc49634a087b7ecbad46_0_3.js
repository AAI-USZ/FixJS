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

		Engine.initialize(level);
		
		//cells
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
				changeCell(x, y);				
			}
		}
		
		mode = '';
				
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
			var baseX = e.clientX-Game.container.offsetLeft-parseInt(Engine.container.style.left);
			var baseY = e.clientY-Game.container.offsetTop-parseInt(Engine.container.style.top);

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

			newPosition = $('#gameContainer').children('div').offset();
			if (newPosition.left != position.left && newPosition.top != position.top) return;

			var baseX = e.clientX-Game.container.offsetLeft-parseInt(Engine.container.style.left);
			var baseY = e.clientY-Game.container.offsetTop-parseInt(Engine.container.style.top);

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
					$(this).css('opacity', '0.3');	
				}
			}
		});

		createCode();
	}