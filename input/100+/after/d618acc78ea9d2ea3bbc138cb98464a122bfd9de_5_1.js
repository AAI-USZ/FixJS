function(level) {
		this.cellList = [];

    	var cells = [];
    	for (var i = 0; i < level.dimensions.width; i++) {
    		cells[i] = [];
	    	for (var j = 0; j < level.dimensions.height; j++) {
    			var tileID   = j * level.dimensions.width + i;
    			var tiletData = (level.cells[tileID] != undefined) ? level.cells[tileID] : level.cells[0];

    			if (tiletData.accessible) {
    				cells[i][j] = 0;
    			} else {
    				cells[i][j] = 1;
    			}
    		}
    	}

		for (var i = 0; i < level.items.length; i++) {
		    cells[level.items[i].x][level.items[i].y] = 1;
		}
		if(cells[x2][y2] == 1) return;

		var graph = new GraphClass.Graph(cells);

		var start	= graph.nodes[x1][y1];
		var end 	= graph.nodes[x2][y2];

		this.cellList = Astar.search(graph.nodes, start, end);		
	}