function(properties) {
			var that = Gibberish.Bus();
				
			Gibberish.extend(that, {
				amp:		 	.2,
				cmRatio:		2,
				index:		 	5,			
				attack:			22050,
				decay:			22050,
				maxVoices:		5,
				voiceCount:		0,
				glide:			0,
				note : function(_frequency) {
					var synth = this.children[this.voiceCount++];
					if(this.voiceCount >= this.maxVoices) this.voiceCount = 0;
					synth.note(_frequency);
				},
			});
			
			if(typeof properties !== "undefined") {
				Gibberish.extend(that, properties);
			}
			
			that.children = [];
			
			for(var i = 0; i < that.maxVoices; i++) {
				var props = {
					attack: 	that.attack,
					decay:		that.decay,
					cmRatio:	that.cmRatio,
					index:		that.index,
					amp: 		1,
				};
				
				var synth = this.FMSynth(props);
				synth.send(that, 1);

				that.children.push(synth);
			}
			
			that.mod = Gibberish.polyMod;
			Gibberish.polyDefineProperties( that, ["cmRatio", "index", "attack", "decay", "glide"] );
			
			(function() {
				var _amp = that.amp;
				Object.defineProperty(that, "amp", {
					get: function() { return _amp; },
					set: function(value) {
						_amp = value;
						that.send(Master, value);
					},
				});
			})();
			
			return that;
		}