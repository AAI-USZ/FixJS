function(character, level) {
		var oldLevel = character.currentLevel;
		character.removeFromLevel();

		eval('var position = this.levels[level].initialPositions.'+oldLevel);
		character.x = position[0];
		character.y = position[1];

		Cassidie.game.levels[level].attachCharacter(character);

		character.client.socket.emit('level_change', {
			level: {
				name:				this.levels[level].name,
				title:				this.levels[level].title,
				dimensions: 		this.levels[level].dimensions,
				cells:				this.levels[level].cells,
				characters: 		this.levels[level].getCharacters(true),
				objects:			this.levels[level].getObjects(true),
				sprites:			this.levels[level].sprites
			},
			character: character.getData()
		});
		
	}