function () {
			var options = {};
			if (this.flip) {
				options = {direction: "right", offset: {x:-2, y:0}};
			} else {
				options = {direction: "left", offset: {x:2, y:0}};
			}

			if (!ig.game.actionLock) {
				ig.game.spawnEntity( EntityFireballX, this.pos.x+(this.flip ? 0 : -10), this.pos.y+5, options );
			}
		}