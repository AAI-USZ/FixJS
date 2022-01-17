function(decision, noSort) {
		if (decision) {
			if (!decision.side && decision.pokemon) decision.side = decision.pokemon.side;
			if (!decision.choice && decision.move) decision.choice = 'move';
			if (!decision.priority) {
				var priorities = {
					'beforeTurn': 100,
					'beforeTurnMove': 99,
					'switch': 6,
					'runSwitch': 6.1,
					'residual': -100,
					'team': 102,
					'start': 101
				};
				if (priorities[decision.choice]) {
					decision.priority = priorities[decision.choice];
				}
			}
			if (decision.choice === 'move') {
				if (selfB.getMove(decision.move).beforeTurnCallback) {
					selfB.addQueue({choice: 'beforeTurnMove', pokemon: decision.pokemon, move: decision.move}, true);
				}
			} else if (decision.choice === 'switch' && !decision.speed) {
				if (decision.side.active[0].isActive) decision.speed = decision.side.active[0].stats.spe;
			}
			if (decision.move) {
				var target;

				if (!decision.targetPosition) {
					target = selfB.resolveTarget(decision.pokemon, decision.move);
					decision.targetSide = target.side;
					decision.targetPosition = target.position;
				}

				decision.move = selfB.getMove(decision.move);
				if (!decision.priority) {
					var priority = decision.move.priority;
					priority = selfB.runEvent('ModifyPriority', decision.pokemon, target, decision.move, priority);
					decision.priority = priority;
				}
			}
			if (!decision.pokemon && !decision.speed) decision.speed = 1;
			if (!decision.speed && decision.newPokemon) decision.speed = decision.newPokemon.stats.spe;
			if (!decision.speed) decision.speed = decision.pokemon.stats.spe;

			if (decision.choice === 'switch' && !decision.side.pokemon[0].isActive) {
				// if there's no actives, switches happen before activations
				decision.priority = 6.2;
			}

			selfB.queue.push(decision);
		}
		if (!noSort) {
			selfB.queue.sort(selfB.comparePriority);
		}
	}