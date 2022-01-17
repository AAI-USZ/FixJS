function(col, row, tileSize) {
		this._row = row;
		this._col = col;
		this._tileSize = tileSize;

        var GRAPH_SCALE = 42;
        var GRAPH_OFFSET_X = 25;
        var GRAPH_OFFSET_Y = 25;
        var NODE_SIZE = 20;
        var LINE_WIDTH = 2;
        var NODE_COUNT = 12;

        var pixelRenderer = new PixelRenderer("", this._col, this._row);
        
        var graph = new BinaryTree();
        graph.generateGraph(NODE_COUNT);
        graph.debug();

        this._graphs = graph;
        
        // graphLayout = new HVLayout(graph, NODE_SIZE);
        var graphLayout = new RecursiveWindingLayout(graph, 1);
        graphLayout.createLayout();

        var graphRenderer = new GraphRenderer(pixelRenderer);
        graphRenderer.scale = GRAPH_SCALE;
        graphRenderer.offsetX = GRAPH_OFFSET_X;
        graphRenderer.offsetY = GRAPH_OFFSET_Y;
        graphRenderer.nodeSize = NODE_SIZE;
        graphRenderer.lineColor = 2;
        graphRenderer.lineWidth = 3;
        graphRenderer.setGraph(graph);

        var irregularShape = new ShapeGenerator();
        irregularShape.fillColor = 2;
        irregularShape.borderColor = 2;
        // irregularShape.borderColor = 1;
        graphRenderer.nodeRenderer = irregularShape;
        graphRenderer.draw();

        // TOP - DOWN - RIGHT - LEFT
        // TOP_LEFT, TOP_RIGHT, BOTTOM_LEFT, BOTTOM_RIGHT
		var DIRECTION = [{x: 0, y: -1}, {x: 0, y: 1}, {x: 1, y: 0}, {x: -1, y: 0},
						 {x: -1, y: -1}, {x: 1, y: -1}, {x: -1, y: 1}, {x: 1, y: 1}];

        var cells = pixelRenderer.cells;
        // Generate real border
        // Check direct neighbor
        for (var i = 0; i < this._col; i++) {
        	for (var j = 0; j < this._row; j++) {
        		if (cells[i][j] > 0) {
        			for (var d = 0; d < 4; d++) {
        				var x = i + DIRECTION[d].x;
        				var y = j + DIRECTION[d].y;

        				if (x < 0 || x >= this._col || y < 0 || y >= this._row ||
        					cells[x][y] > 0)
        					continue;

        				// var c = Math.abs(cells[x][y]);

        				cells[x][y] -= (1 << d);
        				//if (cells[x][y] === 0)
        			}
        		}
        	}
        }
        // Check corner neighbor
        for (var i = 0; i < this._col; i++) {
        	for (var j = 0; j < this._row; j++) {
        		if (cells[i][j] > 0) {
        			for (var d = 4; d < 8; d++) {
        				var x = i + DIRECTION[d].x;
        				var y = j + DIRECTION[d].y;

        				if (x < 0 || x >= this._col || y < 0 || y >= this._row ||
        					cells[x][y] !== 0)
        					continue;
        				cells[x][y] = -(d * 3);
        			}
        		}
        	}
        }

		// cache them for the speedy!
		var terrains = [];
		for (var i = 0; i < this._terrains.length; i++)
		{
			terrains[i] = this.World.TerrainManager[this._terrains[i]];
		}

		// Paint tiles
		for (var i = 0; i < this._row; i++){
			this._tiles[i] = [];
			for (var j = 0; j < this._col; j++){
                var cellType = cells[j][i];
                if (cellType >= 0) {
					// this._tiles[i][j] = terrains[cellType].GetRandomSprite();
					this._tiles[i][j] = terrains[cellType].GetSprite(0);
                }
                else
                {
                	cellType = -cellType;
                	this._tiles[i][j] = { transition : terrains[0].GetSpriteByName("waterEdge" + cellType)};
                	// HACK: Set a base tile
                	this._tiles[i][j].baseTile = terrains[2].GetSprite(0);
                }
			}
		}

        // Add spawn points
        for (var i = 0; i < graphRenderer.nodes.length - 1; i++) {
            this.World.AddSpawnPoint(graphRenderer.nodes[i]);
        }

		this._width = this._tileSize * this._col;
		this._height = this._tileSize * this._row;
		
		this.ready = true;
		return this;
	}