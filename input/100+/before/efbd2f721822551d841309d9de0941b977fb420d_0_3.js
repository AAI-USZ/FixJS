function(col, row, tileSize) {
		this._row = row;
		this._col = col;
		this._tileSize = tileSize;
        
		// Generate gound tiles
		for (i = 0; i < this._row; i++){
			this._tiles[i] = [];
			for (j = 0; j < this._col; j++){
				this._tiles[i][j] = Crafty.math.randomInt(this._tileType[0][0], this._tileType[0][1]);
			}
		}
		
		var tileID = 0;
		
		// Generate border
		for (i = 1; i < this._row - 1; i++){
			tileID = Crafty.math.randomInt(this._tileType[1][0], this._tileType[1][1]);
			Crafty.e("2D, Canvas, solid, " + this._tileNames[tileID])
				.attr({x:0, y:i * this._tileSize, z:2, w:this._tileSize, h:this._tileSize});
			tileID = Crafty.math.randomInt(this._tileType[1][0], this._tileType[1][1]);
			Crafty.e("2D, Canvas, solid, " + this._tileNames[tileID])
				.attr({x:(this._col - 1) * this._tileSize, y:i * this._tileSize, z:2, w:this._tileSize, h:this._tileSize});
		}
		for (j = 0; j < this._col; j++){
			tileID = Crafty.math.randomInt(this._tileType[1][0], this._tileType[1][1]);
			Crafty.e("2D, Canvas, solid, " + this._tileNames[tileID])
				.attr({x: j * this._tileSize, y: 0, z: 2, w: this._tileSize, h:this._tileSize});
			tileID = Crafty.math.randomInt(this._tileType[1][0], this._tileType[1][1]);
			Crafty.e("2D, Canvas, solid, " + this._tileNames[tileID])
				.attr({x: j * this._tileSize, y: (this._row - 1) * this._tileSize, z: 2, w: this._tileSize, h:this._tileSize});
		}
        
        var patchRegion = this.generateRegion(30, 20);
        var x0 = 5, y0 = 5;
        for (i = 0; i < patchRegion.length; i++)
        {
            for (j = 0; j < patchRegion[i].length; j++)
            {
				if (patchRegion[i][j] === 1)
				{
					// create using the archetype, don't use MapEntity directly
					// can store different type in random list if needed
					this.CreateObject(Rock, j + y0, i + x0);
				}
                else if (patchRegion[i][j] === 2)
                {
					this._tiles[i + x0][j + y0] = Crafty.math.randomInt(this._tileType[3][0], this._tileType[3][1]);
                }
            }
        }
        
		
		for (i = 0; i < this._tileNames.length; i++)
		{
			this._tileSprite[i] = Crafty.e("2D, Canvas, " + this._tileNames[i]).attr({x:-100, y: -100, z:-1});
		}
		
		this._width = this._tileSize * this._col;
		this._height = this._tileSize * this._row;
		
		this.ready = true;
		return this;
	}