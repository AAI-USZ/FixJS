function(properties) {
			var that = { 
				type:			"Synth2",
				category:		"Gen",
				waveform:		"Triangle",
				amp:			.6,
				attack:			10000,
				decay:			10000,
				release:		10000,
				sustain: 		null,
				attackLevel:  	1,
				sustainLevel: 	.5,
				cutoff:			.2,
				resonance:		2.5,
				filterMult:		.3,
				isLowPass:		true,
				frequency:		440,
				
				note : function(_frequency) {
					this.frequency = _frequency;
					this._function.setFrequency(_frequency);
					if(this.env.getState() > 1) this.env.setState(0);
				},
			};
			
			if(typeof properties !== "undefined") {
				Gibberish.extend(that, properties);
			}
			Gibberish.extend(that, new Gibberish.ugen(that));
			
			that.env = Gibberish.make["ADSR"](that.attack, that.decay, that.sustain, that.release, that.attackLevel, that.sustainLevel);
			that.osc = Gibberish.make[that.waveform](that.frequency, that.amp);
			that.filter = Gibberish.make["Filter24"](that.cutoff, that.resonance, that.isLowPass);
			
			that.name = Gibberish.generateSymbol(that.type);
			Gibberish.masterInit.push(that.name + " = Gibberish.make[\"Synth2\"]();");	
			that._function = Gibberish.make["Synth2"](that.osc, that.env, that.filter);
			window[that.name] = that._function;
			
			Gibberish.defineProperties( that, ["frequency", "amp", "attack","decay","sustain","release","attackLevel","sustainLevel","cutoff","resonance","filterMult", "waveform"] );
			
			var waveform = that.waveform;
		    Object.defineProperty(that, "waveform", {
				get: function() { return waveform; },
				set: function(value) {
					if(waveform !== value) {
						waveform = value;
						that.osc = Gibberish.make[value]();
						Gibberish.dirty(that);
					}
				},
			});
			
			return that;
		}