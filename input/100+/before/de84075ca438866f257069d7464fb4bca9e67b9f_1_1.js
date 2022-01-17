function () {
			var options = {};
			if (this.flip) {
				options = {direction: "down", offset: {x:0, y:-2}};
			} else {
				options = {direction: "up", offset: {x:0, y:2}};
			}
			ig.game.spawnEntity( EntityFireballY, this.pos.x+1, this.pos.y+(this.flip ? 0 : this.size.y-10), options );
		}