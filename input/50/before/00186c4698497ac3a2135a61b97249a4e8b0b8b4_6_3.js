function(speed) {
					this.speed = speed;
					if(this._function !== null) {
						this._function.setPhase(0);
						Gibberish.dirty = true;
						this.dirty = true;
					}
				}