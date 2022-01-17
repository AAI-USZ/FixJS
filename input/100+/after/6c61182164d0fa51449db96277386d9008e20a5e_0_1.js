function(x, y, notiyOthers, noPath) {
    	if (x < 0 || y < 0 || x > this.level.levelData.level.dimensions.width-1 || y > this.level.levelData.level.dimensions.height-1) return;

    	if (noPath) {
    		this.x		= x;
    		this.y		= y;
    		this.cellX	= 0;
    		this.cellY	= 0;

    		clearInterval(this.intervalID);

    		Game.engine.setEntityPosition(this.id, this.x, this.y, 0, 0);

    		return;
    	}

    	var cells = [];
    	for (var i = 0; i < this.level.levelData.level.dimensions.width; i++) {
    		cells[i] = [];
	    	for (var j = 0; j < this.level.levelData.level.dimensions.height; j++) {
    			var tileID   = j * this.level.levelData.level.dimensions.width + i;
    			var tiletData = (this.level.levelData.level.cells[tileID] != undefined) ? this.level.levelData.level.cells[tileID] : this.level.levelData.level.cells[0];

    			if (tiletData.accessible) {
    				cells[i][j] = 0;
    			} else {
    				cells[i][j] = 1;
    			}
    		}
    	}

    	for (var i = 0; i < this.level.entities.length; i++) {
    		if (this.level.entities[i].entityType == 'item') cells[this.level.entities[i].x][this.level.entities[i].y] = 1;
    	}
    	if(cells[x][y] == 1) return;

    	var graph = new Graph(cells);

    	var start	= graph.nodes[this.x][this.y];
    	var end 	= graph.nodes[x][y];

    	var path = astar.search(graph.nodes, start, end);
    	if(path.length == 0) return;

    	if (notiyOthers) Cassidie.socket.emit('character_move', {x: x, y: y});		

    	this.moveCharacterCell(path, notiyOthers);
    }