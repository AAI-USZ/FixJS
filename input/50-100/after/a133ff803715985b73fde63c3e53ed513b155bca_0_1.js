function(pokemon) {
			if (!pokemon.volatiles['illusion']) {
				var i;
				for (i=pokemon.side.pokemon.length-1; i>pokemon.position; i--) {
					if (!pokemon.side.pokemon[i]) continue;
					if (!pokemon.side.pokemon[i].fainted) break;
				}
				pokemon.illusion = pokemon.side.pokemon[i];
			}
		}