function() {
		while (selfB.faintQueue.length) {
			var faintData = selfB.faintQueue.shift();
			if (!faintData.target.fainted) {
				selfB.add('faint', faintData.target);
				selfB.runEvent('Faint', faintData.target, faintData.source, faintData.effect);
				faintData.target.fainted = true;
				faintData.target.side.pokemonLeft--;
			}
		}
		if (!selfB.p1.pokemonLeft && !selfB.p2.pokemonLeft) {
			selfB.win();
			return true;
		}
		if (!selfB.p1.pokemonLeft) {
			selfB.win(selfB.p2);
			return true;
		}
		if (!selfB.p2.pokemonLeft) {
			selfB.win(selfB.p1);
			return true;
		}
		return false;
	}