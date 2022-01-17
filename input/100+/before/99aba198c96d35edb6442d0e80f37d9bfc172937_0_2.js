function(decision, noSort) {
		if (decision) {
			if (!decision.priority) {
				var priorities = {
					'beforeTurn': 100,
					'beforeTurnMove': 99,
					'switch': 6,
					'runSwitch': 5.9,
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
			if (!decision.side) decision.side = decision.pokemon;
			if (!decision.choice && decision.move) decision.choice = 'move';
			if (!decision.pokemon && !decision.speed) decision.speed = 1;
			if (!decision.speed && decision.newPokemon) decision.speed = decision.newPokemon.stats.spe;
			if (!decision.speed) decision.speed = decision.pokemon.stats.spe;
			selfB.queue.push(decision);
		}
		if (!noSort) {
			selfB.queue.sort(selfB.comparePriority);
		}
	}