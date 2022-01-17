function World(){
    
    //loads images

    var terrain = loadImages('grass', 'reeds', 'sandandwater', 'sand', 'wheat', 'cement','cement_stairs', 'kitchen', 'dirt', 'dirt2', 'grassalt', 'hole', 'lava', 'lavarock', 'water', 'waterandgrass', 'farming_fishing', 'barrels', 'tileset01', 'fence', 'castle_outside', 'castlewalls', 'castlefloors', 'castlefloors_outside', 'brickwalldark', 'dungeon', 'signs', 'house_tiles_exterior', 'house_tiles_interior', 'house_stairs_interior', 'cabinets', 'bridges', 'chests', 'buckets', 'wheelbarrow', 'misc', 'miscellaneous', 'fence_alt', 'rocks', 'wood_house_exterior', 'white_house_exterior', 'treetop', 'treetrunk', 'hole', 'furniture', 'furniture2', 'flowers', 'plowed_soil', 'signpost', 'plants', 'limestone_wall01');

    

	function WorldChunk(name, x, y, debug){
		this.name = name;
		this.x = x;
		this.y = y;
		this.w = CHUNK_SIZE;
		this.h = CHUNK_SIZE;
		this.left = x - this.w/2;
		this.top = y - this.h/2;
		this.right = this.left + this.w;
		this.bottom = this.top + this.h;
		this.debug = debug;
		if (debug){
		    console.log('%s: (%s,%s,%s,%s)', this.name, this.left, this.top, this.w, this.h);
		}
		this.init();
	}
	
	WorldChunk.allChunks = [];
	
	// global to all WorldChunks
	WorldChunk.chunkAt = function(x,y){
	    for (var i = 0; i < WorldChunk.allChunks.length; i++){
	        if (WorldChunk.allChunks[i].pixelIsInChunk(x,y)){
	            return WorldChunk.allChunks[i];
	        }
        }
    };
    
    WorldChunk.prototype.locationAt = function(x,y){
        var row = Math.round((x - this.left) / 32);
        var col = Math.round((y - this.top) / 32);
        // console.log('accessing row %s, column %s', row, col);
        return this.rows[row][col];
    };

	WorldChunk.prototype.init = function(){
		var self = this;
		self.rows = [];
		var req = new XMLHttpRequest();
		req.addEventListener('load', function(evt){
			self.parseSpec(JSON.parse(req.responseText));
		});
		req.addEventListener('error', function(evt){
			console.log('Error loading map');
		});
		req.addEventListener('abort', function(evt){
			console.log('Loading map cancelled');
		});
		req.open('GET', 'maps/' + this.name + '.json', true);
		req.send();
		WorldChunk.allChunks.push(this);
	};
	
	WorldChunk.prototype.pixelIsInChunk = function(x,y){
	    if (x < this.left || x > this.right) return false;
	    if (y < this.top || y > this.bottom) return false;
	    return true;
    };
    
    
    WorldChunk.prototype.isVisible = function(){
        if (this.right < world.viewport.x || this.left > (world.viewport.x + world.viewport.w)) return false;
        if (this.bottom < world.viewport.y || this.top > (world.viewport.y + world.viewport.h)) return false;
        return true;
    };
    
    WorldChunk.prototype.draw = function(ctx){
        if (!this.isVisible()) return;
		this.topTiles = [];
		for(var i = 0; i < this.rows.length; i++){
			for(var e = 0; e < this.rows[i].length; e++){
				for (var t = 0; t < this.rows[i][e].length; t++){
					var tile = this.rows[i][e][t];
					if(tile.spec === 'Farming_Fishing AA' && tile.y > (character.y + 16)){
						this.topTiles.push(tile)
					}else{
						tile.draw(ctx);
					}
				}
			}
		}
		if (this.debug){
		    ctx.strokeStyle = 'red';
		    ctx.strokeRect(this.left, this.top, this.w, this.h);
	    }
    };
    
    WorldChunk.prototype.drawTop = function(ctx){
        if (!this.isVisible()) return;
        this.topTiles.forEach(function(tile){
            tile.draw(ctx);
        });
    };
    
	WorldChunk.prototype.parseSpec = function(chunkspec){
	    var self = this;
		for(var i = 0; i < chunkspec.length; i++){
			var row = [];
			this.rows.push(row);
			for(var e = 0; e < chunkspec[i].length; e++){
				var location = [];
				row.push(location);
				var spec = chunkspec[i][e];
				if (!spec || spec === '') continue;
				if (isArray(spec)){
					spec.forEach(function(subspec){
						if (subspec === 'collision'){
							location.collision = true;
						}else if (subspec !== ''){
							location.push(new Tile(subspec,e,i, self));
							if(subspec === 'Castle_outside LH'){
								console.log('collide');
								location.collision = true;
							}
						}
					});
				}else{
					location.push(new Tile(spec,e,i, self));
				}
			}
		}
	};

	
    new WorldChunk('castle_entrance_with_towers_and_windows', 0, 0);
    new WorldChunk('castlewall_with_windows', 640, 0);
    new WorldChunk('castlewall_with_windows', -640,0);
    new WorldChunk('grass', 640, 640);
    new WorldChunk('path_vertical_with_fence', 0, 640);
    new WorldChunk('grass', -640, 640);
    new WorldChunk('grass', 640, -640);
    new WorldChunk('path_vertical_with_fence', 0, -640);
    new WorldChunk('grass', -640, -640);


	
	function findCollision(x, y){
		if (x === undefined){
		    x = character.x;
		    y = character.y;
		}
		var location = findLocationAt(x,y);
		if (location){
		    if (location.collision) return true;
		    if (location.length === 0) return true;
		    return false;
		}
		return true;
	}

	// We don't actually use this function for anything
	// We were only using it to find collisions, which we can
	// do more simply with findCollision()
	//WE NEED THIS FOR FINDING THE TILE A CHARACTER OR MONSTER IS ON AND FOR CHECKING MONSTERS COLLIDING WITH STUFF
	function findLocationAt(x,y){
		if (x === undefined){
		    x = character.x;
		    y = character.y;
		}
		var chunk = WorldChunk.chunkAt(x,y);
		if (chunk){
		    return chunk.locationAt(x,y);
		}
	}

	function Tile(spec, tx, ty, chunk){
        // console.log('creating tile %s, %s, %o', tx, ty, chunk);
	 var tile_offset = spec.split(' '),
		 tile = terrain[tile_offset[0].toLowerCase()],
		 offset = offsets[tile_offset[1]];
		 this.spec = spec;
		 this.g = tile;
		 this.sx = offset.x;
		 this.sy = offset.y;
		 this.w = 32;
		 this.h = 32;
		 this.x = tx * this.w + chunk.left;
		 this.y = ty * this.h + chunk.top;
	}
	
	Tile.prototype.draw = function(ctx, debug){
		ctx.drawImage(this.g, this.sx, this.sy, this.w, this.h, this.x, this.y, this.w, this.h);
		if (debug){
		    console.log('drawing tile at %s, %s, you are at %s, %s', this.x, this.y, character.x, character.y);
		    ctx.strokeStyle = 'green';
		    ctx.strokeRect(this.x, this.y, this.w, this.h);
	    }
	};
	
	function drawworld(ctx){
	    WorldChunk.allChunks.forEach(function(chunk){
	        chunk.draw(ctx);
        });
	}
	
	function drawworldtop(ctx){
	    WorldChunk.allChunks.forEach(function(chunk){
	        chunk.drawTop(ctx);
        });
	}
	var world = {
	    viewport: {x: 0, y: 0, w: WIDTH, h: HEIGHT},
		draw: drawworld,
		drawtop: drawworldtop,
		findCollision: findCollision,
		chunks: WorldChunk.allChunks
	};
	return world;
}