function(pokemon, priority) {
			if (pokemon.ability !== 'stall') {
				return priority - 0.1;
			}
		}