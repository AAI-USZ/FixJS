function(pokemon) {
				this.debug('Pursuit start');
				var sources = this.effectData.sources;
				this.add('-activate', pokemon, 'move: Pursuit');
				for (var i=0; i<sources.length; i++) {
					if (sources[i].movedThisTurn || sources[i].status === 'slp' || sources[i].status === 'frz' || sources[i].volatiles['truant']) {
						continue;
					}
					this.useMove('pursuit', sources[i], pokemon);
					sources[i].deductPP('pursuit');
				}
			}