function(properties) {
			var that = {
				type:			"PolyFM",
				category:		"Gen",
				amp:		 	.5,
				cmRatio:		2,
				index:		 	5,			
				attack:			22050,
				decay:			22050,
				maxVoices:		10,
				voiceCount:		0,
				
				note : function(_frequency) {
					var synth = this.synths[this.voiceCount++];
					if(this.voiceCount >= this.maxVoices) this.voiceCount = 0;
					synth.note(_frequency);
				},
			};
			
			if(typeof properties !== "undefined") {
				Gibberish.extend(that, properties);
			}
			Gibberish.extend(that, new Gibberish.ugen(that));

			that.synths = [];
			that.synthFunctions = [];
			
			for(var i = 0; i < that.maxVoices; i++) {
				var props = {};
				Gibberish.extend(props, that);
				delete props.note; // we don't want to copy the poly note function obviously
				delete props.type;
				delete props.synths;
				delete props.synthFunctions;
				
				props.type = "FMSynth";
				
				var synth = this.FMSynth(props);
				that.synths.push(synth);
				that.synthFunctions.push(synth._function);
			}
			
			that.name = Gibberish.generateSymbol(that.type);
			Gibberish.masterInit.push(that.name + " = Gibberish.make[\"PolyFM\"]();");	
			window[that.name] = Gibberish.make["PolyFM"](that.synthFunctions);
			
			Gibberish.defineProperties( that, ["amp", "attack", "decay", "cmRatio", "index", "frequency"] );
			
			return that;
		}