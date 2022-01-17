function (currentLevel) {
		
		//loop through the grid
		for (var i = 0; i < currentLevel.get('height'); i++) {
			for (var j = 0; j < currentLevel.get('width'); j++) {
				//is this a wall element
				//console.log(levelOneMapArray[j][i]);
				if(currentLevel.get('map')[i][j] === 1) {
					sc['wall' + i + j] = new Wall();
					sc['wall' + i + j].get('entity').attr({x: j * gameContainer.conf.get('gridSize'), y: (i + 3) * gameContainer.conf.get('gridSize')});
				} else {
					//if not a wall
				}
			} //end for j
		} //end for i
		
		
	}