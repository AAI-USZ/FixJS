function(col, row, tileSize) {
		this._row = row;
		this._col = col;
		this._tileSize = tileSize;

		// Generate gound tiles
		for (var i = 0; i < this._row; i++){
			this._tiles[i] = [];
			for (var j = 0; j < this._col; j++){
				this._tiles[i][j] = Crafty.math.randomInt(this._tileType[0][0], this._tileType[0][1]);
			}
		}
		
        var nodeCount = 7;
        var maxNeighbour = 3;
		var regionMapW = 9;
		var regionMapH = 6;

        this._graphLayout = Crafty.e("GraphLayout")
                    .generateGraph(nodeCount, maxNeighbour);
//                    .generateGraphLayout(regionMapW, regionMapH, regionW, regionH);
        this._graphLayout.generateGraphLayout(this.processLayout, this);
		var tileID = 0;
		
//        var patchRegion = this.generateRegion(30, 20);
//        this.addRegion(patchRegion, 20, 20);

		for (var i = 0; i < this._tileNames.length; i++) {
			this._tileSprite[i] = Crafty.e("2D, Canvas, " + this._tileNames[i]).attr({x:-100, y: -100, z:-1});
		}
		
		this._width = this._tileSize * this._col;
		this._height = this._tileSize * this._row;
		
		this.ready = true;
		return this;
	}