function(properties) {
			var that = {
				type:		"Flanger",
				category:	"FX",
				feedback:	.5,
				offset:		125,
				amount:		125,
				rate:		.25,
				source:		null,
				buffer:		new Float32Array(88200),				
				bufferLength: 88200,
			};
			
			Gibberish.extend(that, Gibberish.ugen);
			if(typeof properties !== "undefined") {
				Gibberish.extend(that, properties);
			}
			
			that.delayModulation = Gibberish.make["Sine"]();
			
			that.name = Gibberish.generateSymbol(that.type);
			Gibberish.masterInit.push(that.name + " = Gibberish.make[\"Flanger\"]();");
			window[that.name] = Gibberish.make["Flanger"](that.buffer, that.bufferLength, that.delayModulation, that.offset);
			that._function = window[that.name];

			Gibberish.defineProperties( that, ["amount", "feedback", "offset", "rate"] );

			return that;
		}