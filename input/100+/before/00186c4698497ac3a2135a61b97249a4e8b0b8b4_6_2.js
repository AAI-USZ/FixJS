function(freq, amp) {
			var that = { 
				type:		"Square",
				category:	"Gen",
				frequency:	freq || 440, 
				amp:		amp * .35 || .1,
			};
			Gibberish.extend(that, Gibberish.ugen);
			
			that.name = Gibberish.generateSymbol(that.type);
			Gibberish.masterInit.push(that.name + " = Gibberish.make[\"Square\"]();");
			window[that.name] = Gibberish.make["Square"]();
			that._function = window[that.name];
			
			Gibberish.defineProperties( that, ["frequency", "amp"] );
			
			return that;
		}