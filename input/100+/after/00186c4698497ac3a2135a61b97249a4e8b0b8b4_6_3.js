function(freq, amp) {
			var that = { 
				type:		"Triangle",
				category:	"Gen",
				frequency:	freq || 440, 
				amp:		amp * .35 || .1,
			};
			Gibberish.extend(that, new Gibberish.ugen());
			
			that.name = Gibberish.generateSymbol(that.type);
			Gibberish.masterInit.push(that.name + " = Gibberish.make[\"Triangle\"]();");
			window[that.name] = Gibberish.make["Triangle"]();
			that._function = window[that.name];
			
			Gibberish.defineProperties( that, ["frequency", "amp"] );
	
			return that;
		}