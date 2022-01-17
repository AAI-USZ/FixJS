function(time, feedback) {
			var that = {
				type:		"Delay",
				category:	"FX",
				feedback:	feedback || .5,
				time:		time || 22050,
				source:		null,
				buffer:		new Float32Array(88200),				
				bufferLength: 88200,
			};
			Gibberish.extend(that, new Gibberish.ugen());

			if(that.time >= 88200) {
				that.time = 88199;
				//console.log("MAX DELAY TIME = 88199 samples");
			}

			that.name = Gibberish.generateSymbol(that.type);
			Gibberish.masterInit.push(that.name + " = Gibberish.make[\"Delay\"]();");
			window[that.name] = Gibberish.make["Delay"](that.buffer, that.bufferLength);
			that._function = window[that.name];

			Gibberish.defineProperties( that, ["time", "feedback"] );

			return that;
		}