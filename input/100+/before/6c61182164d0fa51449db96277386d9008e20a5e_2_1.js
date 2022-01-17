function(level) {
		this.cellList = [];

		var cells = [];
		for (var j = 0; j < level.dimensions.height; j++) {
		    var row = [];
		    for (var i = 0; i < level.dimensions.width; i++) {
		    	var tileID   = i * level.dimensions.width + j;
		    	var tiletData = (level.cells[tileID] != undefined) ? level.cells[tileID] : level.cells[0];

		    	if (tiletData.accessible) {
		    		row.push(0);
		    	} else {
		    		row.push(1);
		    	}
		    }
		    cells.push(row);
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