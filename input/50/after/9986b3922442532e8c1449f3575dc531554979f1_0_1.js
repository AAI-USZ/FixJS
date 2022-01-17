function(priority, pokemon) {
			if (pokemon.ability !== 'stall') {
				return priority - 0.1;
			}
		}