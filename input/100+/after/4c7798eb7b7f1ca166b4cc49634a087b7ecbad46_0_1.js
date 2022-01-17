function(e) {
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
		}