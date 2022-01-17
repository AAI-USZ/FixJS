function(pokemon, target, move) {
			// this is a horrible hack; todo: not this
			// a proper fix is currently blocked by the BH Assist bug
			if (move.id === 'solarbeam' && this.weather === 'sunnyday') {
				return;
			}
			if (move.isTwoTurnMove && pokemon.useItem()) {
				this.debug('power herb - remove charge turn for '+move.id);
				this.add('-prepare',pokemon,move,target);
				pokemon.addVolatile(move.id);
			}
		}