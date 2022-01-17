function(stats, pokemon) {
			if (pokemon.template.species === 'Unown') {
				// Strange Orb
				pokemon.stats.spa *= 3;
				pokemon.stats.spe *= 2;
				pokemon.types = [pokemon.hpType];
			}
		}