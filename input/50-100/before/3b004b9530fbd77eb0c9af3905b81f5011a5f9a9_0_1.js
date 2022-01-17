function(pokemon, target, move) {
			if (move.isTwoTurnMove && pokemon.useItem()) {
				this.debug('power herb - remove charge turn for '+move.id);
				this.add('-prepare',pokemon,move,target);
				pokemon.addVolatile(move.id);
			}
		}