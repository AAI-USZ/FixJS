function(value) {
					damping = value / 100;
					that.dampingValue = .5 - damping;
					Gibberish.dirty(this);
				}