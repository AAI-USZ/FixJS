function () {
				
				model.set({'currentLevelNum' : model.get('currentLevelNum') + 1});
				model.loadMap('level' + model.get('currentLevelNum'));
				infobox = new Infobox({'text': "Level " +  model.get('currentLevel').get('name') + " Push Space", 'actionToTrigger': 'LevelRestart'});
				
			}