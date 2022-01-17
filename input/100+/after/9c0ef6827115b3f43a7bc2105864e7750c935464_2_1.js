function(properties) {
			var that = { 
				type:		"Synth",
				category:	"Gen",
				waveform:	"Triangle",
				amp:		.5,				
				attack:		22050,
				decay:		22050,
				frequency:	0,
				
				note : function(_frequency) {
					this.frequency = _frequency;
					this._function.setFrequency(this.frequency);
					if(this.env.getState() > 0) this.env.setState(0);
				},
			};
			
			Gibberish.extend(that, new Gibberish.ugen(that));
			
			if(typeof properties !== "undefined") {
				Gibberish.extend(that, properties);
			}
			
			that.env = Gibberish.make["Env"](that.attack, that.decay);
			that.osc = Gibberish.make[that.waveform](that.frequency, that.amp);
			
			that.name = Gibberish.generateSymbol(that.type);
			Gibberish.masterInit.push(that.name + " = Gibberish.make[\"Synth\"]();");	
			that._function = Gibberish.make["Synth"](that.osc, that.env); // only passs ugen functions to make
			window[that.name] = that._function;
			
			Gibberish.defineProperties( that, ["frequency", "amp", "attack", "decay"] );
				
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