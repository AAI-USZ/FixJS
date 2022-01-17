function(amount, amp) {
			var that = {
				type:		"SoftClip",
				category:	"FX",
				amount:		amount,
				amp:		amp,
				source:		null,
			};
			Gibberish.extend(that, new Gibberish.ugen());

			that.name = Gibberish.generateSymbol(that.type);
			Gibberish.masterInit.push(that.name + " = Gibberish.make[\"SoftClip\"]();");
			window[that.name] = Gibberish.make["SoftClip"]();

			Gibberish.defineProperties( that, ["amount", "amp"] );

			return that;
		}