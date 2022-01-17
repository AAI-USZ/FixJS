function(attack, decay, sustain, release, attackLevel, sustainLevel) {
			var that = { 
				type:		"ADSR",
				category:	"Gen",	
				attack:		attack || 10000,
				decay:		decay	|| 0,
				release:	release || 10000,
				sustain: 	typeof sustain === "undefined" ? null : sustain,
				attackLevel:  attackLevel || 1,
				sustainLevel: sustainLevel || 1,

				trigger: function() {
					that._function.setPhase(0);
					that._function.setState(0);
				},
			};
			Gibberish.extend(that, new Gibberish.ugen());
			
			that.name = Gibberish.generateSymbol(that.type);
			Gibberish.masterInit.push(that.name + " = Gibberish.make[\"ADSR\"]();");
			window[that.name] = Gibberish.make["ADSR"]();
			that._function = window[that.name];
			
			Gibberish.defineProperties( that, ["attack", "decay", "sustain", "release", "attackLevel", "sustainLevel"] );
	
			return that;
		}