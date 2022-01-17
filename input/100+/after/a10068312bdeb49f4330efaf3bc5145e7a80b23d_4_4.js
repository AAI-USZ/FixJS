function() {
		var startX = this.get('currentLevel').get('startCol') * gameContainer.conf.get('gridSize');
		var startY = this.get('currentLevel').get('startRow') * gameContainer.conf.get('gridSize');
		var startDir = this.get('currentLevel').get('startDir');
		//console.log(this.get('startX') + " " + this.get('startY'));
		if(typeof sc['player1'] !== 'object') {
			sc['player1'] = new Snake({'startX': startX, 'startY': startY, 'startDir' : startDir});
		} else {
			sc['player1'].set({'startX': startX, 'startY': startY, 'startDir' : startDir});
		}
		if(typeof infc['scorePlayer1'] !== 'object') { 
			infc['scorePlayer1'] = new Scorebox({'name': sc['player1'].get('name')});
		}
	}