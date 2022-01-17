function () {
		//place fruit
		do {	
			var fruitX = Crafty.math.randomInt(1, this.get('currentLevel').get('width') - 1);
			var fruitY = Crafty.math.randomInt(4, this.get('currentLevel').get('height') - 1);
		} while (this.get('currentLevel').get('map')[fruitY][fruitX] === 1)
		
		sc['fruit'] = new Fruit({'posX':fruitX * gameContainer.conf.get('gridSize'), 'posY':(fruitY + 3) * gameContainer.conf.get('gridSize')});
	}