function(cutoff, resonance, isLowPass) {
			var that = {
				type:		"Filter24",
				category:	"FX",
				cutoff:		cutoff,
				resonance:	resonance,
				isLowPass:	typeof isLowPass === "undefined" ? true : isLowPass,
				source:		null,
			};
			Gibberish.extend(that, new Gibberish.ugen(that));

			that.name = Gibberish.generateSymbol(that.type);
			Gibberish.masterInit.push(that.name + " = Gibberish.make[\"Filter24\"]();");
			window[that.name] = Gibberish.make["Filter24"]();

			Gibberish.defineProperties( that, ["cutoff", "resonance", "isLowPass"] );

			return that;
		}