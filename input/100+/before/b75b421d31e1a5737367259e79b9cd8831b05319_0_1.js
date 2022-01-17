function(data) {
			this.levelData = data;

			var width	= Game.gameData.viewport.width;
			var height	= Game.gameData.viewport.height;

			this.skinsCoordinates	= {};
			this.entities			= {};
			this.animations			= {};

			this.scene = document.createElement('div');
			this.scene.setAttribute('style', 'position:absolute;height:'+height+'px;width:'+width+'px;left:0px;top:0px;');			
			Game.container.appendChild(this.scene);		

			//Tiles
			for (var y = 0; y < this.levelData.dimensions.height; y++) {
				for (var x = this.levelData.dimensions.width-1; x >= 0; x--) {
					var tileID   = y * this.levelData.dimensions.width + x;
					var tiletData = (this.levelData.cells[tileID] != undefined) ? this.levelData.cells[tileID] : this.levelData.cells[0];

					var position = this.getTilePosition(x, y);
					var left	= position.x;
					var top		= position.y-this.isometry.y;
					var width	= this.cellSize.width;
					var height	= this.cellSize.height;
					var image	= './ressources/levels/tiles/'+tiletData.background+'.png';

					var tile = document.createElement('div');
					tile.setAttribute('style', 'position:absolute;height:'+height+'px;z-index:0;width:'+width+'px;left:'+left+'px;top:'+top+'px;background:url('+image+');');	
					tile.setAttribute('id', 'cell_'+x+'_'+y);	

					this.scene.appendChild(tile);		

					if (tiletData.sprite != '') {
						var id			= tiletData.sprite;
						var spriteData	= this.levelData.sprites['s_'+id];

						var image  = './ressources/levels/sprites/'+tiletData.sprite+'.png';
						var sprite = document.createElement('div');
						sprite.setAttribute('style', 'position:absolute;height:'+spriteData.height+'px;z-index:0;z-index:'+(this.levelData.dimensions.width - x + y)+';width:'+spriteData.width+'px;left:'+(left -spriteData.x)+'px;top:'+(top - spriteData.y)+'px;background:url('+image+');');	
						sprite.setAttribute('id', 'sprite_'+x+'_'+y);	

						this.scene.appendChild(sprite);		
					}
				}
			}
			
			this.cursor = document.createElement('div');
			this.cursor.setAttribute('style', 'z-index:20000;position:absolute;height:36px;width:80px;left:-80px;top:-36px;background:url(./ressources/cursor.png)');
			this.scene.appendChild(this.cursor);		

			//Events
			var self 	= this;
			var drag	= false;
			var dragged = false;
			var startX;
			var startY;
			CrossBrowser.addEventListener(Game.container, 'mousedown', function(e) {
				var mousePosition = CrossBrowser.getMousePosition(e);

				startX	= mousePosition.left;
				startY	= mousePosition.top;
				drag	= true;
			});

			CrossBrowser.addEventListener(Game.container, 'mousemove', function(e) {
				var mousePosition = CrossBrowser.getMousePosition(e);

				var baseX = mousePosition.left - Game.container.offsetLeft - parseInt(self.scene.style.left);
				var baseY = mousePosition.top - Game.container.offsetTop - parseInt(self.scene.style.top);

				var overTile = self.getCoordinates(baseX, baseY);
				var position = self.getTilePosition(overTile.x, overTile.y)

				self.cursor.style.left = position.x+'px';
				self.cursor.style.top = (position.y-self.isometry.y)+'px';

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
			}, false);

			CrossBrowser.addEventListener(Game.container, 'mouseup', function(e) {
				if (!dragged) {
					var mousePosition = CrossBrowser.getMousePosition(e);

					var baseX = mousePosition.left - Game.container.offsetLeft - parseInt(self.scene.style.left);
					var baseY = mousePosition.top - Game.container.offsetTop - parseInt(self.scene.style.top);
					
					var clickedTile = self.getCoordinates(baseX, baseY);
					Game.level.checkCoordinates(clickedTile.x, clickedTile.y);
					Game.level.playerCharacter.move(clickedTile.x, clickedTile.y, true);
				}
			}, false);

			CrossBrowser.addEventListener(document, 'mouseup', function(e) {
				dragged = false;
				drag	= false;
			});

			this.animationInterval = setInterval(function() {
				self.doAnimation();	
			}, 100);
		}