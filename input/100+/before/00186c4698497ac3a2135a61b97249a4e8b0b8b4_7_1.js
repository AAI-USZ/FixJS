function(waveform, amp, attack, decay) {
			var that = { 
				type:		"Synth",
				category:	"Gen",
				waveform:	waveform || "Sine",
				amp:		amp || .5,				
				attack:		attack || 22050,
				decay:		decay  || 22050,
				frequency:	440,
				
				note : function(_frequency) {
					this.frequency = _frequency;
					if(this.env.getState() >= 1) this.env.setState(0);
				},
			};
			
			Gibberish.extend(that, Gibberish.ugen);
			
			that.env = Gibberish.make["Env"](that.attack, that.decay);
			that.osc = Gibberish.make[that.waveform](that.frequency, that.amp);
			
			that.name = Gibberish.generateSymbol(that.type);
			Gibberish.masterInit.push(that.name + " = Gibberish.make[\"Synth\"]();");	
			window[that.name] = Gibberish.make["Synth"](that.osc, that.env); // only passs ugen functions to make
			
			Gibberish.defineProperties( that, ["frequency", "amp", "attack", "decay"] );
				
		    Object.defineProperty(that, "waveform", {
				get: function() { return waveform; },
				set: function(value) {
					if(waveform !== value) {
						waveform = value;
						that.osc = Gibberish.make[value]();
						that.dirty = true;
						Gibberish.dirty = true;
					}
				},
			});
			
			return that;
		}