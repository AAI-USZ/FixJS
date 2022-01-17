function(properties) {
			var that = {
				type:		"Decimator",
				category:	"FX",
				bitDepth:	16,
				sampleRate: 1,	// 44100 = 1
				source:		null,
			};
			if(typeof properties !== "undefined") {
				Gibberish.extend(that, properties);
			}
			Gibberish.extend(that, new Gibberish.ugen());
			
			that.modulation = Gibberish.make["Sine"]();
			
			that.name = Gibberish.generateSymbol(that.type);
			Gibberish.masterInit.push(that.name + " = Gibberish.make[\"Decimator\"]();");
			window[that.name] = Gibberish.make["Decimator"](that.modulation);

			Gibberish.defineProperties( that, ["frequency", "bitDepth", "sampleRate"] );

			return that;
		}