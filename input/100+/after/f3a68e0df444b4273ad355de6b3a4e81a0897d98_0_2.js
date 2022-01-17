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
				glide: 		0,
				
				note : function(frequency) {
					if(typeof this.frequency === "object") {
						prevFreq = this.frequency.operands[0];
					}else{
						prevFreq = this.frequency;
					}
					
					this.frequency = frequency;
					this._function.setFrequency(frequency);
					this.env.start();
					
					if(this.glide > 0) {
						this.mod("frequency", Line(frequency - prevFreq, 0, this.glide), "-");
					
						var oldMod = this.mods[this.mods.length - 1];
						
						var me = this;
						future( function() { me.removeMod(oldMod) }, this.glide );
					}
				},
			};
			Gibberish.extend(that, new Gibberish.ugen(that));

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