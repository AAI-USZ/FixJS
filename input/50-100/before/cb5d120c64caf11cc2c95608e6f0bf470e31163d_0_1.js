function(target, source, move) {
			if (source && source !== target && move && move.category !== 'Status') {
				if (target.useItem()) {
					this.add("-message",target.name+" is switched out with the Eject Button! (placeholder)");
					target.switchFlag = true;
				}
			}
		}