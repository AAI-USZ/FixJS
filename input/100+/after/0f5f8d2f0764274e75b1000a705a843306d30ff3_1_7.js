function(properties) {
			var that = {
				type:		"BufferShuffler",
				category:	"FX",
				chance: 	.25,		
				rate: 		11025,
				length:		22050,
				shouldRandomizeReverse : true,
				shouldRandomizePitch :   true,
				value : 0,
				readIndex : 0,
				writeIndex : -1,
				increment : 1,
				loopPhase : 0,
				isCrazy : false,
				crazyTime : 0,
				reverse : false,
				reverseChance : .5,
				pitchShifting : false,
				pitchChance : .5,
				pitchMin : .25,
				pitchMax : 2,
				mix : 1,
				phase : 0,
				fadeCount : 0,
				fading : false,
				shouldPrint : false,
			};
			
			Gibberish.extend(that, new Gibberish.ugen(that));
			if(typeof properties !== "undefined") {
				Gibberish.extend(that, properties);
			}

			that.buffer = new Float32Array(that.length * 2);

			that.name = Gibberish.generateSymbol(that.type);
			Gibberish.masterInit.push(that.name + " = Gibberish.make[\"BufferShuffler\"]();");
			window[that.name] = Gibberish.make["BufferShuffler"](that.buffer);
			that._function = window[that.name];

			//Gibberish.defineProperties( that, ["time", "feedback"] );

			return that;
		}