function() {
			for(var i = 0; i < arguments.length; i++) {
				this.ugens.remove(arguments[i]);
			}
			Gibberish.dirty = true;
		}