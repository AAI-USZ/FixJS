function(e) {
	    	var mousePosition = CrossBrowser.getMousePosition(e);

	    	var baseX = mousePosition.left - Game.container.offsetLeft - parseInt(self.scene.style.left);
	    	var baseY = mousePosition.top - Game.container.offsetTop - parseInt(self.scene.style.top);

	    	var overTile = self.getCoordinates(baseX, baseY);
	    	var position = self.getTilePosition(overTile.x, overTile.y)

	    	self.cursor.style.left = position.x+'px';
	    	self.cursor.style.top = (position.y-self.isometry.y)+'px';

    		var onEntity = false;
    		for (var i = 0; i < Game.level.entities.length; i++) {
    			if (Game.level.entities[i].x == overTile.x && Game.level.entities[i].y == overTile.y) onEntity = true; 
    		}

    		var numTile = overTile.y * self.levelData.dimensions.width + overTile.x;
    		if (self.levelData.cells[numTile] != undefined) {
    			if (onEntity) {
    				self.setCursor('./ressources/cursor_a');					
    			} else if (self.levelData.cells[numTile].accessible) {
    				self.setCursor('./ressources/cursor');					
    			} else {
    				self.setCursor('./ressources/cursor_na');
    			}
    		} else {
    				self.setCursor('./ressources/cursor_na');					
    		}

	    	if (!drag) return;
	    	dragged = true;

	    	var x = mousePosition.left - startX;
	    	var y = mousePosition.top - startY;

	    	var cX = parseInt(self.scene.style.left);
	    	var cY = parseInt(self.scene.style.top);

	    	self.scene.style.left	= (cX + x)+'px';
	    	self.scene.style.top	= (cY + y)+'px';
	    	startX = mousePosition.left;
	    	startY = mousePosition.top;
	    }