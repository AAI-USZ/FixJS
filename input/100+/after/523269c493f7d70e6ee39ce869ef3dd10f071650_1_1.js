function(e) {
				var mousePosition = CrossBrowser.getMousePosition(e);

				var baseX = mousePosition.left - Game.container.offsetLeft + self.camera.position.x;
				var baseY = mousePosition.top - Game.container.offsetTop + self.camera.position.y;

				var overTile = self.getCoordinates(baseX, baseY);
				var position = self.getTilePosition(overTile.x, overTile.y)

				self.cursor.position.x = position.x;
				self.cursor.position.y = (position.y-self.isometry.y);

				var onEntity = false;
				for (var i = 0; i < Game.level.characters.length; i++) {
					if (Game.level.characters[i].x == overTile.x && Game.level.characters[i].y == overTile.y) onEntity = true; 
				}

				for (var i = 0; i < Game.level.objects.length; i++) {
					if (Game.level.objects[i].x == overTile.x && Game.level.objects[i].y == overTile.y) onEntity = true; 
				}

				var numTile = overTile.y * self.levelData.dimensions.width + overTile.x;
				if (numTile >= 0 && numTile < self.levelData.dimensions.width * self.levelData.dimensions.height) {
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

				self.camera.position.x -= x;
				self.camera.position.y -= y;
				startX = mousePosition.left;
				startY = mousePosition.top;
			}