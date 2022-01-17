function() {
		var startX = this.get('currentLevel').get('startCol') * gameContainer.conf.get('gridSize');
		var startY = this.get('currentLevel').get('startRow') * gameContainer.conf.get('gridSize');
		console.log(this.get('startX') + " " + this.get('startY'));
		sc['player1'] = new Snake({'startX': startX, 'startY': startY});
		infc['scorePlayer1'] = new Scorebox({'name': sc['player1'].get('name')});
	}