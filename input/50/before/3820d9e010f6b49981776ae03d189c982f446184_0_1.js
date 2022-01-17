function(data) {
			var character = Game.level.getCharacter(data.characterId);
			if (character != null) character.speak(data.message);
	
			this.trigger(Events.CHAT_RECEIVE, data);
		}