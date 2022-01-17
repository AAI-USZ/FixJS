function (callback) {
		var levelName = 'level' + this.get('currentLevelNum'); 
		console.log(levelName);
		this.loadMap(levelName,this.displayMap);
		this.placeFruit();
		this.placeSnake();
		this.updateScores();
		
		if(typeof callback === 'function') {
			callback();
		}
		
	}