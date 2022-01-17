function(properties) {
			var that = {
				type:		"Reverb",
				category:	"FX",
				roomSize:	.5,
				damping:	.2223,
				wet:		.5,
				dry:		.55,				
				source:		null,
				tuning:		{
				    combCount: 		8,
				    combTuning: 	[1116, 1188, 1277, 1356, 1422, 1491, 1557, 1617],

				    allPassCount: 	4,
				    allPassTuning: 	[556, 441, 341, 225],
				    allPassFeedback:0.5,

				    fixedGain: 		0.015,
				    scaleDamping: 	0.9,

				    scaleRoom: 		0.28,
				    offsetRoom: 	0.7,

				    stereoSpread: 	23
				},
				channelCount: 1,
			};
			Gibberish.extend(that, Gibberish.ugen);
			if(typeof properties !== "undefined") {
				Gibberish.extend(that, properties);
			}
			
			that.name = Gibberish.generateSymbol(that.type);

			that.combFilters = (function() {
				var combs	= [],
					num		= that.tuning.combCount,
					damp	= that.damping * that.tuning.scaleDamping,
					feed	= that.roomSize * that.tuning.scaleRoom + that.tuning.offsetRoom,
					sizes	= that.tuning.combTuning;

				for(var c = 0; c < that.channelCount; c++){
					for(var i = 0; i < 8; i++){
						combs.push( Gibberish.make["Comb"](new Float32Array(sizes[i] + c * that.tuning.stereoSpread), feed, damp) );
					}
				}
				return combs;
			})();;

			that.allPassFilters = (function() {
				var apfs = [],
				num		= that.tuning.allPassCount,
				feed	= that.tuning.allPassFeedback,
				sizes	= that.tuning.allPassTuning;

				for(var c = 0; c < that.channelCount; c++){
					for(var i = 0; i < num; i++){
						apfs.push( Gibberish.make["AllPass"](new Float32Array(sizes[i] + c * that.tuning.stereoSpread), feed) );
					}
				}
				return apfs;
			})();

			Gibberish.masterInit.push(that.name + " = Gibberish.make[\"Reverb\"]();");
			window[that.name] = Gibberish.make["Reverb"](that.combFilters, that.allPassFilters, that.tuning);
			that._function = window[that.name];

			Gibberish.defineProperties( that, ["time", "feedback"] );

			return that;
		}