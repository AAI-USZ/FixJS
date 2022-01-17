function(){
    	var model = this;
    	var entity = Crafty.e("Keyboard");
    	entity
            .bind('EnterFrame', function(e){
				model.updateScores();
            })
			.bind('KeyDown', function() {
				if(this.isDown('SPACE')) {
					//Crafty.pause(); //must fix pause timer bug in Crafty before we can pause the game
				}
			})
			.bind('LevelRestart', function () {
				model.displayMap(model.get('currentLevel'));
				model.placeFruit();
			})
			.bind('NextLevel', function () {
				
				model.set({'currentLevelNum' : model.get('currentLevelNum') + 1});
				model.loadMap('level' + model.get('currentLevelNum'));
				infobox = new Infobox({'text': "Level " +  model.get('currentLevel').get('name') + " Push Space", 'actionToTrigger': 'LevelRestart'});
				
			})
            .setName('World');
    	model.set({'entity' : entity });
		
		this.loadMap('level1',this.displayMap);
		this.placeFruit();
		this.placeSnake();
		this.updateScores();
    }