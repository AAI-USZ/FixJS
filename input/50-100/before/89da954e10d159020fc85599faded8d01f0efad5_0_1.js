function(move) {
			if (move.secondary) {
				move.secondary.chance = 100;
			}
			if (move.accuracy !== true && move.accuracy <= 99) {
				move.accuracy = 0;
			}
			move.willCrit = true;
		}