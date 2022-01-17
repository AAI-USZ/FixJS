function(pokemon) {
				if (pokemon.hasType('Flying')) {
					// don't just delete the type; since
					// the types array may be a pointer to the
					// types array in the Pokedex.
					if (pokemon.types[0] === 'Flying') {
						pokemon.types = [pokemon.types[1]];
					} else {
						pokemon.types = [pokemon.types[0]];
					}
				}
				//pokemon.negateImmunity['Ground'] = 1;
			}