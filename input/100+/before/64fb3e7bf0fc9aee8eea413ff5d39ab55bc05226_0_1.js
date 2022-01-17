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

        var pixelRenderer = new PixelRenderer("", this._row, this._col);
        
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
        graphRenderer.lineColor = 3;
        graphRenderer.lineWidth = 3;
        graphRenderer.setGraph(graph);

        var irregularShape = new ShapeGenerator();
        irregularShape.fillColor = 2;
        irregularShape.borderColor = 1;

        graphRenderer.nodeRenderer = irregularShape;
        
        graphRenderer.draw();

        var cells = pixelRenderer.cells;

		// cache them for the speedy!
		var terrains = [];
		for (var i = 0; i < this._terrains.length; i++)
		{
			terrains[i] = this.World.Terrains[this._terrains[i]];
		}

		// Paint tiles
		for (var i = 0; i < this._row; i++){
			this._tiles[i] = [];
			for (var j = 0; j < this._col; j++){
                var cellType = cells[i][j];
				this._tiles[i][j] = terrains[cellType].GetRandomSprite();
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