function(frequency, amp) {
			var that = {
				type:		"RingModulator",
				category:	"FX",
				frequency:	440,
				amp:		.5,
				mix:		.5,
				source:		null,
			};
			Gibberish.extend(that, Gibberish.ugen);
			
			that.modulation = Gibberish.make["Sine"]();
			
			that.name = Gibberish.generateSymbol(that.type);
			Gibberish.masterInit.push(that.name + " = Gibberish.make[\"RingModulator\"]();");
			window[that.name] = Gibberish.make["RingModulator"](that.modulation);

			Gibberish.defineProperties( that, ["frequency", "amp", "mix"] );

			return that;
		}