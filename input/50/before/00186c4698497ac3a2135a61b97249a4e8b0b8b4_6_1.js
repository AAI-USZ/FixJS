function(value) {
					damping = value / 100;
					that.dampingValue = .5 - damping;
					this.dirty = true;
					Gibberish.dirty = true;
				}