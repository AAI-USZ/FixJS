function(target, pokemon) {
			if (pokemon.status && !target.status && target.trySetStatus(pokemon.status)) {
				this.add('-curestatus', pokemon, '[from] move: Psycho Shift', '[of] '+target);
				pokemon.setStatus('');
			} else {
				return false;
			}
		}