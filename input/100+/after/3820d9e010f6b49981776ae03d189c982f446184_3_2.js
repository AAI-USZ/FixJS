function(e) {
    		if (!dragged) {
	    		var mousePosition		= CrossBrowser.getMousePosition(e);
	    		var containerPosition	= CrossBrowser.findPosition(Game.container);

    			var baseX = mousePosition.left - containerPosition.left + self.camera.position.x;
    			var baseY = mousePosition.top - containerPosition.top + self.camera.position.y;

    			var clickedTile = self.getCoordinates(baseX, baseY);
    			Game.level.checkCoordinates(clickedTile.x, clickedTile.y);
    			Game.level.playerCharacter.move(clickedTile.x, clickedTile.y, true);
    		}
    	}