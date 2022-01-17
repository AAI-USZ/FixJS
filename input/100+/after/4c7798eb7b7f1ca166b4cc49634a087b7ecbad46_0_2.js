function(e) {
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
		}