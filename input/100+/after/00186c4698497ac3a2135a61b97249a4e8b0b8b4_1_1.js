function() {
			if(typeof Gibber.Environment !== "undefined") { // if we are using with the Gibber editing environment
				this.Environment.init();
			}
		
			this.dev = Sink(audioProcess, 2, 1024);
			this.sampleRate = this.dev.sampleRate;		
			this.beat = (60000 / this.bpm) * (this.sampleRate / 1000);
			this.measure = this.beat * 4;
		
			this.initDurations();

			this.samples = { // preload
				kick 	: atob(samples.kick),
			    snare 	: atob(samples.snare),
			    //hat 	: atob(samples.snare), 
			};
		
			this.callback = new Callback();
			console.log(this.callback);
			window.loop = function(cb, time) {
				var l = Gibber.callback.addCallback(cb, time, true);
				l.end = function() {
					Gibber.callback.callbacks = Gibber.callback.callbacks.removeObj(this);
				};
				return l;
			};
		
			this.meta(window);
			window.Master = Gibberish.Bus();
			Master.connect(Gibberish.MASTER);
			//console.log("MASTER", Master);
		}