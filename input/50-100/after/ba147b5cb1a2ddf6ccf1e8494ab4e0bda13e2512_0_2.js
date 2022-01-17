function(target, pokemon) {
			if (pokemon.status && !target.status && target.trySetStatus(pokemon.status)) {
				pokemon.cureStatus();
			} else {
				return false;
			}
		}