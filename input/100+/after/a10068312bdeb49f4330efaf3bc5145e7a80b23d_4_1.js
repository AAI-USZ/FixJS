function(){
    	var model = this;
		
    	var entity = Crafty.e("Keyboard, World");
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
				model.startLevel( function () {
					infobox = new Infobox({'text': "Level " +  model.get('currentLevel').get('name') + " Push Space",  "actionToTrigger" : "LevelStart"});
				});
				
			})
			.bind('NextLevel', function () {
				model.set({'currentLevelNum' : model.get('currentLevelNum') + 1});
				Crafty.trigger('LevelRestart');
			})
			.bind('EndGame', function () {
				model.endGame();
			})
            .setName('World');
    	model.set({'entity' : entity });
				
		//Crafty.trigger('LevelRestart');
		//Crafty.trigger("PauseSnakes");
		model.startLevel(function () {
				//Crafty("World").trigger('LevelRestart');
				infobox = new Infobox({'text': "Level " +  model.get('currentLevel').get('name') + " Push Space", "actionToTrigger" : "LevelStart"});
		});
		//Crafty.pause();
		
    }