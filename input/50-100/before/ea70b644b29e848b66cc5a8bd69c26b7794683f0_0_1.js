function(pokemon, target, move) {
			if (pokemon.removeVolatile('truant')) {
				this.add('cant',pokemon,'ability: Truant', move);
				return false;
			}
			pokemon.addVolatile('truant');
		}