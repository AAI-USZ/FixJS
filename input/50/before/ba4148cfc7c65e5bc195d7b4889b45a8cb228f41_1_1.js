function(pokemon, target) {
			if (pokemon.removeVolatile('shadowforce')) return;
			pokemon.addVolatile('shadowforce');
			this.add('-prepare', pokemon, 'Shadow Force', target);
			return true;
		}