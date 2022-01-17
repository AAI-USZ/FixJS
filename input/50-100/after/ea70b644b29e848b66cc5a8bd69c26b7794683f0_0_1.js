function(pokemon, target, move) {
			if (pokemon.removeVolatile('truant')) {
				this.add('cant',pokemon,'ability: Truant', move);
				pokemon.movedThisTurn = true;
				return false;
			}
			pokemon.addVolatile('truant');
		}