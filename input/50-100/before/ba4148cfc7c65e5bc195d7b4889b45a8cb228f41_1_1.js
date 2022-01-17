function(pokemon, target) {
			if (pokemon.removeVolatile('solarbeam')) return;
			this.add('-prepare', pokemon, 'SolarBeam', target);
			if (this.weather === 'sunnyday') return;
			pokemon.addVolatile('solarbeam');
			return true;
		}