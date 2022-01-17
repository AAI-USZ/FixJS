function() {
			for(var i = 0; i < arguments.length; i++) {
				this.ugens.push(arguments[i]);
			}
			Gibberish.dirty();
		}