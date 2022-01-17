function(data) {
			var lines = data.split("\n");
			var level = {}, city = {};
			level.gridSize = [lines[lines.length -1].length, lines.length];
			level.tileSize = [64, 64];
			level.tileSet = "tiles";
			level.tiles = [];
			game.level = new a2d.TileGrid();
			for(var x = 0; x < level.gridSize[0]; x++) {
				for(var y = 0; y < level.gridSize[1]; y++) {
					//console.log(lines[y][x]);
					if(lines[y].length > x) {
						level.tiles.push(lines[y][x] === "-" ? 0 : -1);
						if(lines[y][x] === 'h') {
							//level.tiles[level.tiles.length -1].meat = true;							
							game.level.push(new game.Meat(new a2d.Position(x * 64 + parseInt(64 / 2, 10), y * 64 + parseInt(64 / 2, 10))));
						}						
					} else {
						level.tiles.push(-1);
					}					
				}
			}

			for(var x = 0; x < level.gridSize[0]; x++) {
				for(var y = 0; y < level.gridSize[1]; y++) {
					level.tiles.push(-1);
				}
			}
			game.level.setData(level);

			city.gridSize = [6, 1];
			city.tileSize = [1240, 1024];
			city.tileSet = "city";
			city.tiles = [0, 0, 0, 0, 0, 0];
			game.city = new a2d.TileGrid(city);
			city.tileSet = "sky";
			city.tileSize = [1240, 900];
			game.sky = new a2d.TileGrid(city);
			//create physics boxes for each tile in grid
			var tiles = game.level.getTiles(),
				pos = new Box2D.Common.Math.b2Vec2(0, 0);
			for(var x = 0; x < level.gridSize[0]; x++) {
				for(var y = 0; y < level.gridSize[1]; y++) {
					if(tiles[x][y].tile !== -1) {
						pos.X = tiles[x][y].position.X;
						pos.Y = tiles[x][y].position.Y;
						bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;
						fixDef.shape = new Box2D.Collision.Shapes.b2PolygonShape;
						fixDef.shape.SetAsBox(3.2, 3.2);
						bodyDef.position.Set(pos.x, pos.y);
						game.world.CreateBody(bodyDef).CreateFixture(fixDef);				
					}
				}
			}

			a2d.root.push(game.sky);
			a2d.root.push(game.city);
			a2d.root.push(game.level);
			game.player = new game.Player(new a2d.Position(100, 120));			
			game.level.push(game.player);
			a2d.resources.start.play();
			a2d.resources.music.play(true);
			var mute = new a2d.Label(icon.volumeup, { font : "48px fontello", position: new a2d.Position( 100, 100 ), color: "#FFFFFF", border: { width: 5, color: "#000000"} });		
			mute.on("mouseover", function() {
				mute.set({border: { width: 5, color: "#e34500"} });
			});
			mute.on("mouseout", function() {
				mute.set({border: { width: 5, color: "#000000"} });
			});			
			mute.on("click", function() {
				a2d.mute = !a2d.mute;
				if(a2d.mute) {
					mute.text = icon.volumeoff;					
					a2d.resources.music.stop();					
				} else {
					mute.text = icon.volumeup;
					a2d.resources.music.play();
				}
				
			});
			//var mute = new a2d.Label('volume mute', { font : "21px fontello", position: new a2d.Position( 100, 100 ), color: "#FFFFFF" });
			a2d.root.push(mute);
		}