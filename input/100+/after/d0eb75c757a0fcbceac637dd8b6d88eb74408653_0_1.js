function(pokemon) {
				this.debug('Pursuit start');
				var sources = this.effectData.sources;
				this.add('-activate', pokemon, 'move: Pursuit');
				for (var i=0; i<sources.length; i++) {
					this.runMove('pursuit', sources[i], pokemon);
					sources[i].movedThisTurn = true;
				}
			}