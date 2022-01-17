function(decision) {
		// returns whether or not we ended in a callback
		switch (decision.choice) {
		case 'start':
			selfB.add('start');
			selfB.switchIn(selfB.p1.pokemon[0]);
			selfB.switchIn(selfB.p2.pokemon[0]);
			selfB.midTurn = true;
			break;
		case 'move':
			if (decision.pokemon !== decision.pokemon.side.active[0]) return false;
			if (decision.pokemon.fainted) return false;
			selfB.runMove(decision.move, decision.pokemon, selfB.getTarget(decision));
			break;
		case 'beforeTurnMove':
			if (decision.pokemon !== decision.pokemon.side.active[0]) return false;
			if (decision.pokemon.fainted) return false;
			selfB.debug('before turn callback: '+decision.move.id);
			decision.move.beforeTurnCallback.call(selfB, decision.pokemon, selfB.getTarget(decision));
			break;
		case 'event':
			selfB.runEvent(decision.event, decision.pokemon);
			break;
		case 'team':
			var i = parseInt(decision.team[0]);
			if (i >= 6 || i < 0) return;

			if (i == 0) return;
			var pokemon = decision.side.pokemon[i];
			if (!pokemon) return;
			decision.side.pokemon[i] = decision.side.pokemon[0];
			decision.side.pokemon[0] = pokemon;
			decision.side.pokemon[i].position = i;
			decision.side.pokemon[0].position = 0;
			return;
			// we return here because the update event would crash since there are no active pokemon yet
			break;
		case 'switch':
			if (decision.pokemon) {
				decision.pokemon.beingCalledBack = true;
				var lastMove = selfB.getMove(decision.pokemon.lastMove);
				if (!(lastMove.batonPass || (lastMove.self && lastMove.self.batonPass))) {
					// Don't run any event handlers if Baton Pass was used.
					if (!selfB.runEvent('SwitchOut', decision.pokemon)) {
						// Warning: DO NOT interrupt a switch-out
						// if you just want to trap a pokemon.
						// To trap a pokemon and prevent it from switching out,
						// (e.g. Mean Look, Magnet Pull) use the 'trapped' flag
						// instead.

						// Note: Nothing in BW or earlier interrupts
						// a switch-out.
						break;
					}
				}
			}
			if (decision.pokemon && !decision.pokemon.hp && !decision.pokemon.fainted) {
				break;
			}
			selfB.switchIn(decision.newPokemon);
			//decision.pokemon.runSwitchIn();
			break;
		case 'runSwitch':
			selfB.singleEvent('Start', decision.pokemon.getAbility(), decision.pokemon.abilityData, decision.pokemon);
			selfB.singleEvent('Start', decision.pokemon.getItem(), decision.pokemon.itemData, decision.pokemon);
			break;
		case 'beforeTurn':
			selfB.eachEvent('BeforeTurn');
			break;
		case 'residual':
			selfB.add('');
			selfB.clearActiveMove(true);
			selfB.residualEvent('Residual');
			break;
		}
		selfB.clearActiveMove();
		if (selfB.faintMessages()) return true;
		selfB.eachEvent('Update');
		if (selfB.p1.active[0].switchFlag) {
			if (selfB.canSwitch(selfB.p1)) {
				selfB.callback('switch-ally');
				return true;
			} else {
				selfB.p1.active[0].switchFlag = false;
			}
		}
		if (selfB.p2.active[0].switchFlag) {
			if (selfB.canSwitch(selfB.p2)) {
				selfB.callback('switch-foe');
				return true;
			} else {
				selfB.p2.active[0].switchFlag = false;
			}
		}
		return false;
	}