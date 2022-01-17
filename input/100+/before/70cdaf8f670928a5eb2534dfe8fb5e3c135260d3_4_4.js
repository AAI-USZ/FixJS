function(properties) {
			var that = {
				type:			"PolySynth",
				category:		"Gen",
				waveform:		"Triangle",
				amp:			.25,				
				attack:			10000,
				decay:			10000,
				release:		10000,
				sustain: 		null,
				attackLevel:  	1,
				sustainLevel: 	.5,
				cutoff:			.1,
				resonance:		2.5,
				filterMult:		 .3,
				isLowPass:		true,
				maxVoices:		5,
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
				
				props.type = "Synth2";
				
				var synth = this.Synth2(props);
				//console.log(synth.note);
				that.synths.push(synth);
				//console.log(that);
				that.synthFunctions.push(synth._function);
			}
			
			that.name = Gibberish.generateSymbol(that.type);
			Gibberish.masterInit.push(that.name + " = Gibberish.make[\"PolySynth\"]();");	
			window[that.name] = Gibberish.make["PolySynth"](that.synthFunctions);
			
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
			
			//Gibberish.ugens.push(that);
			return that;
		}