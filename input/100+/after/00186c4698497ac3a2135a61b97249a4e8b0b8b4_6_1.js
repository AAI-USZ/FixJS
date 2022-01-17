function(freq, amp) {
			var that = { 
				type:		"Sine",
				category:	"Gen",
				frequency:	freq || 440, 
				amp:		amp || .5,
			};
			Gibberish.extend(that, new Gibberish.ugen());
			
			that.name = Gibberish.generateSymbol(that.type);
			Gibberish.masterInit.push(that.name + " = Gibberish.make[\"Sine\"]();");
			window[that.name] = Gibberish.make["Sine"]();
			that._function = window[that.name];
						
			Gibberish.defineProperties( that, ["frequency", "amp"] );
			
			return that;
		}