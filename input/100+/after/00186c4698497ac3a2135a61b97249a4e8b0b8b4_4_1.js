function(attack, decay) {
			var that = { 
				type:		"Env",
				category:	"Gen",
				attack:		attack || 10000,
				decay:		decay || 10000,

				run: function() {
					//that._function.setPhase(0);
					that._function.setState(0);
					that._function.setPhase(0);					
				},
			};
			Gibberish.extend(that, new Gibberish.ugen());
			
			that.name = Gibberish.generateSymbol(that.type);
			Gibberish.masterInit.push(that.name + " = Gibberish.make[\"Env\"]();");
			window[that.name] = Gibberish.make["Env"]();
			that._function = window[that.name];
			that._function.setState(2);
			
			Gibberish.defineProperties( that, ["attack", "decay"] );
	
			return that;
		}