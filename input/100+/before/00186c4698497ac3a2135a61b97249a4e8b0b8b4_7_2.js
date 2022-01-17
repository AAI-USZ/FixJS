function(properties) {
			var that = { 
				type:		"FMSynth",
				category:	"Gen",
				amp:		.25,
				cmRatio:	2,
				index:		5,			
				attack:		22050,
				decay:		22050,
				frequency:	0,
				
				note : function(frequency) {
					this.frequency = frequency;
					this._function.setFrequency(frequency);
					this.env.start();
				},
			};
			Gibberish.extend(that, Gibberish.ugen);

			that.env = Gibberish.make["Env"]();
			that.carrier = Gibberish.make["Sine"]();
			that.modulator = Gibberish.make["Sine"]();
			
			that.name = Gibberish.generateSymbol(that.type);
			Gibberish.masterInit.push(that.name + " = Gibberish.make[\"FMSynth\"]();");
			that._function = Gibberish.make["FMSynth"](that.carrier, that.modulator, that.env);
			window[that.name] = that._function;
						
			Gibberish.defineProperties( that, ["amp", "attack", "decay", "cmRatio", "index", "frequency"] );
			if(typeof properties !== "undefined") {
				Gibberish.extend(that, properties);
			}
			
			return that;
		}