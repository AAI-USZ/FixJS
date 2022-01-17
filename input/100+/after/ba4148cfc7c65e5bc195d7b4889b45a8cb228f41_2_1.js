function(move, pokemon, target) {
		move = this.getMove(move);
		baseMove = move;
		move = this.getMoveCopy(move);
		if (!target) target = this.resolveTarget(pokemon, move);
		if (move.target === 'self' || move.target === 'allies') {
			target = pokemon;
		}

		this.setActiveMove(move, pokemon, target);

		var canTargetFainted = {
			all: 1, foeSide: 1
		};
		this.singleEvent('ModifyMove', move, null, pokemon, target, move, move);
		move = this.runEvent('ModifyMove',pokemon,target,move,move);
		if (baseMove.target !== move.target) {
			//Target changed in ModifyMove, so we must adjust it here
			target = this.resolveTarget(pokemon, move);
		}
		if (!move) return false;

		var attrs = '';
		var missed = false;
		if (pokemon.fainted) {
			return false;
		}

		if (move.isTwoTurnMove && !pokemon.volatiles.twoturnmove) {
			var result = pokemon.addVolatile('twoturnmove', pokemon, move);
			if (result) return; // false means "keep going", e.g. Power Herb activates
			attrs = ' | [silent]'; // suppress the "X used Y!" message if we're executing the attack in the same turn
		}

		var boostTable = [1, 4/3, 5/3, 2, 7/3, 8/3, 3];
		var accuracy = move.accuracy;
		if (accuracy !== true) {
			if (!move.ignoreAccuracy) {
				if (pokemon.boosts.accuracy > 0) {
					accuracy *= boostTable[pokemon.boosts.accuracy];
				} else {
					accuracy /= boostTable[-pokemon.boosts.accuracy];
				}
			}
			if (!move.ignoreEvasion) {
				if (target.boosts.evasion > 0 && !move.ignorePositiveEvasion) {
					accuracy /= boostTable[target.boosts.evasion];
				} else if (target.boosts.evasion < 0) {
					accuracy *= boostTable[-target.boosts.evasion];
				}
			}
		}
		if (move.ohko) { // bypasses accuracy modifiers
			accuracy = 30;
			if (pokemon.level > target.level) accuracy += (pokemon.level - target.level);
		}
		if (move.alwaysHit) accuracy = true; // bypasses ohko accuracy modifiers
		if (target.fainted && !canTargetFainted[move.target]) {
			attrs += ' | [notarget]';
		} else if (accuracy !== true && this.random(100) >= accuracy) {
			missed = true;
			attrs += ' | [miss]';
		}
		var movename = move.name;
		if (move.id === 'hiddenpower') movename = 'Hidden Power';
		this.add('move', pokemon, movename, target+attrs);
		if (target.fainted && !canTargetFainted[move.target]) {
			this.add('-notarget');
			this.singleEvent('MoveFail', move, null, target, pokemon, move);
			if (move.selfdestruct && move.target === 'adjacent') {
				this.faint(pokemon, pokemon, move);
			}
			return true;
		}
		if (typeof move.affectedByImmunities === 'undefined') {
			move.affectedByImmunities = (move.category !== 'Status');
		}
		if ((move.affectedByImmunities && !target.runImmunity(move.type, true)) || (move.isSoundBased && !target.runImmunity('sound', true))) {
			this.singleEvent('MoveFail', move, null, target, pokemon, move);
			if (move.selfdestruct && move.target === 'adjacent') {
				this.faint(pokemon, pokemon, move);
			}
			return true;
		}
		if (missed) {
			this.add('-miss', pokemon);
			this.singleEvent('MoveFail', move, null, target, pokemon, move);
			if (move.selfdestruct && move.target === 'adjacent') {
				this.faint(pokemon, pokemon, move);
			}
			return true;
		}

		var damage = 0;
		pokemon.lastDamage = 0;
		if (!move.multihit) {
			damage = this.moveHit(target, pokemon, move);
		} else {
			var hits = move.multihit;
			if (hits.length) {
				// yes, it's hardcoded... meh
				if (hits[0] === 2 && hits[1] === 5) {
					var roll = this.random(20);
					if (roll < 7) hits = 2;
					else if (roll < 14) hits = 3;
					else if (roll < 17) hits = 4;
					else hits = 5;
				} else {
					hits = this.random(hits[0],hits[1]+1);
				}
			}
			hits = Math.floor(hits);
			for (var i=0; i<hits && target.hp && pokemon.hp; i++) {
				var moveDamage = this.moveHit(target, pokemon, move);
				if (moveDamage === false) return true;
				damage += (moveDamage || 0);
			}
			this.add('-hitcount', target, i);
		}

		target.gotAttacked(move, damage, pokemon);

		if (move.recoil && pokemon.lastDamage) {
			this.damage(pokemon.lastDamage * move.recoil[0] / move.recoil[1], pokemon, target, 'recoil');
		}
		if (move.drain && pokemon.lastDamage) {
			this.heal(Math.ceil(pokemon.lastDamage * move.drain[0] / move.drain[1]), pokemon, target, 'drain');
		}
		if (move.selfdestruct) {
			this.faint(pokemon, pokemon, move);
		}
		if (move.afterMoveCallback) {
			move.afterMoveCallback.call(this, pokemon, target);
		}
		if (!move.negateSecondary && damage !== false) {
			this.singleEvent('AfterMoveSecondary', move, null, target, pokemon, move);
			this.singleEvent('AfterMoveSecondarySelf', move, null, pokemon, target, move);
			this.runEvent('AfterMoveSecondary', target, pokemon, move);
			this.runEvent('AfterMoveSecondarySelf', pokemon, target, move);
		}
		return true;
	}