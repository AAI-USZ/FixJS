function(side) {
		var pokemon = selfB.getRandomSwitchable(side);
		if (!pokemon) return false;
		selfB.runEvent('BeforeSwitchIn', pokemon);
		if (side.active[0]) {
			var oldActive = side.active[0];
			var oldpos = pokemon.position;
			if (!oldActive.hp) {
				return false;
			}
			if (!selfB.runEvent('DragOut', oldActive)) {
				return false;
			}
			selfB.runEvent('SwitchOut', oldActive);
			oldActive.isActive = false;
			pokemon.position = oldActive.position;
			oldActive.position = oldpos;
			side.pokemon[pokemon.position] = pokemon;
			side.pokemon[oldActive.position] = oldActive;
			oldActive.clearVolatile();
		}
		side.active[0] = pokemon;
		pokemon.isActive = true;
		pokemon.activeTurns = 0;
		for (var m in pokemon.moveset) {
			pokemon.moveset[m].used = false;
		}
		pokemon.update();
		selfB.add('drag', side.active[0], side.active[0].getDetails());
		selfB.runEvent('SwitchIn', pokemon);
		selfB.addQueue({pokemon: pokemon, choice: 'runSwitch'});
		return true;
	}