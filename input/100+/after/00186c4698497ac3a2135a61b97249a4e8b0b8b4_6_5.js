function(properties) {
			var that = {
				type:			"PolyKarplusStrong",
				category:		"Gen",
				blend:			1,
				damping:		0,
				maxVoices:		10,
				voiceCount:		0,
				amp:			.2,
				
				note : function(_frequency) {
					var synth = this.synths[this.voiceCount++];
					if(this.voiceCount >= this.maxVoices) this.voiceCount = 0;
					synth.note(_frequency);
				},
			};
			
			that.dampingValue = .5 - that.damping;
			
			if(typeof properties !== "undefined") {
				Gibberish.extend(that, properties);
			}
			Gibberish.extend(that, new Gibberish.ugen());
			
			that.synths = [];
			that.synthFunctions = [];
			for(var i = 0; i < that.maxVoices; i++) {
				var props = {};
				Gibberish.extend(props, that);
				delete props.note; // we don't want to copy the poly note function obviously
				delete props.type;
				delete props.synths;
				delete props.synthFunctions;
				
				props.type = "KarplusStrong";
				
				var synth = this.KarplusStrong(props);

				that.synths.push(synth);

				that.synthFunctions.push(synth._function);
			}
			
			that.name = Gibberish.generateSymbol(that.type);
			Gibberish.masterInit.push(that.name + " = Gibberish.make[\"PolyKarplusStrong\"]();");	
			window[that.name] = Gibberish.make["PolyKarplusStrong"](that.synthFunctions); // only passs ugen functions to make
			
			Gibberish.defineProperties( that, ["blend", "amp"] );
			
		    Object.defineProperty(that, "damping", {
				get: function() {
					return damping * 100;
				},
				set: function(value) {
					damping = value / 100;
					that.dampingValue = .5 - damping;
					Gibberish.dirty(this);
				}

			});
	
			return that;
		}