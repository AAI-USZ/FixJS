function(data) {
				console.log('a');
				Game.trigger(Events.CHARACTER_ACTION_SUCCESS, data);
			}