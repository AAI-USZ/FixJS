function(side) {
			var finished = true;
			for (var i=0; i<side.active.length; i++) {
				var posData = this.effectData.positions[i];
				if (!posData) continue;

				posData.duration--;

				if (posData.duration > 0) {
					finished = false;
					continue;
				}

				// time's up; time to hit! :D
				var target = side.foe.active[posData.targetPosition];
				var move = this.getMove(posData.move);
				if (target.fainted) {
					this.add('-hint', ''+move.name+' did not hit because the target is fainted.');
					this.effectData.positions[i] = null;
					continue;
				}

				this.add('-message', ''+move.name+' hit! (placeholder)');
				target.removeVolatile('Protect');
				target.removeVolatile('Endure');

				if (typeof posData.moveData.affectedByImmunities === 'undefined') {
					posData.moveData.affectedByImmunities = true;
				}

				this.moveHit(target, posData.source, move, posData.moveData);

				this.effectData.positions[i] = null;
			}
			if (finished) {
				side.removeSideCondition('futuremove');
			}
		}