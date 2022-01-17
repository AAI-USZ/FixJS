function(target, source, move) {
			if (source && source !== target && move && move.selfSwitch) {
				move.selfSwitch = false;
			}
		}