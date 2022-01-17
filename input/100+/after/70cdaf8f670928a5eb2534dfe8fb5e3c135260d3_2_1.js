function(amount, amp) {
			var that = {
				type:		"SoftClip",
				category:	"FX",
				amount:		amount || 50,
				amp:		amp || 1,
				source:		null,
			};
			Gibberish.extend(that, new Gibberish.ugen(that));

			that.name = Gibberish.generateSymbol(that.type);
			Gibberish.masterInit.push(that.name + " = Gibberish.make[\"SoftClip\"]();");
			window[that.name] = Gibberish.make["SoftClip"]();

			Gibberish.defineProperties( that, ["amount", "amp"] );

			return that;
		}