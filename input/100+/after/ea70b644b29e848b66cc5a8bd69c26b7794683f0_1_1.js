function(pokemon) {
				this.debug('Pursuit start');
				var sources = this.effectData.sources;
				for (var i=0; i<sources.length; i++) {
					this.runMove('pursuit', sources[i], pokemon);
					sources[i].movedThisTurn = true;
				}
			}