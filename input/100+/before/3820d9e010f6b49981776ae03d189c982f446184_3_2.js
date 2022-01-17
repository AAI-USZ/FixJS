function(e) {
    		if (!dragged) {
    			var mousePosition = CrossBrowser.getMousePosition(e);

    			var baseX = mousePosition.left - Game.container.offsetLeft + self.camera.position.x;
    			var baseY = mousePosition.top - Game.container.offsetTop + self.camera.position.y;

    			var clickedTile = self.getCoordinates(baseX, baseY);
    			Game.level.checkCoordinates(clickedTile.x, clickedTile.y);
    			Game.level.playerCharacter.move(clickedTile.x, clickedTile.y, true);
    		}
    	}