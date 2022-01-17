function(pokemon) {
		if (!pokemon) return false;
		var side = pokemon.side;
		if (side.active[0] && !side.active[0].fainted) {
			//selfB.add('switch-out '+side.active[0].id);
		}
		selfB.runEvent('BeforeSwitchIn', pokemon);
		if (side.active[0]) {
			var oldActive = side.active[0];
			var oldpos = pokemon.position;
			oldActive.isActive = false;
			oldActive.isStarted = false;
			pokemon.position = oldActive.position;
			oldActive.position = oldpos;
			side.pokemon[pokemon.position] = pokemon;
			side.pokemon[oldActive.position] = oldActive;
		}
		var lastMove = null;
		if (side.active[0]) {
			lastMove = selfB.getMove(side.active[0].lastMove);
			if (side.active[0].switchFlag === 'copyvolatile') {
				pokemon.copyVolatileFrom(side.active[0]);
			}
			side.active[0].clearVolatile();
		}
		side.active[0] = pokemon;
		pokemon.isActive = true;
		pokemon.activeTurns = 0;
		for (var m in pokemon.moveset) {
			pokemon.moveset[m].used = false;
		}
		selfB.add('switch', side.active[0], side.active[0].getDetails());
		pokemon.update();
		selfB.runEvent('SwitchIn', pokemon);
		selfB.addQueue({pokemon: pokemon, choice: 'runSwitch'});
	}