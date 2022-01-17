function() {
		if(typeof Gibber.Environment !== "undefined") { // if we are using with the Gibber editing environment
			this.Environment.init();
		}

		this.samples = { // preload
			kick 	: atob(samples.kick),
		    snare 	: atob(samples.snare),
		    //hat 	: atob(samples.snare), 
		}
		
		this.callback = new audioLib.Callback();
		window.loop = function(cb, time) {
			var l = Gibber.callback.addCallback(cb, time, true);
			l.end = function() {
				Gibber.callback.callbacks = Gibber.callback.callbacks.removeObj(this);
			};
			return l;
		};
		this.meta(window);
	}