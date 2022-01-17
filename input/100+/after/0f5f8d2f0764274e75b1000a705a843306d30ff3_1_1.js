function(time, feedback) {
			var that = {
				type:		"AllPass",
				category:	"FX",
				feedback:	feedback || .5,
				time:		time || 500,
				buffer:		new Float32Array(time || 500),
				source:		null,
			};
			Gibberish.extend(that, new Gibberish.ugen(that) );

			that.name = Gibberish.generateSymbol(that.type);
			Gibberish.masterInit.push(that.name + " = Gibberish.make[\"AllPass\"]();");
			window[that.name] = Gibberish.make["AllPass"](that.buffer, that.time, that.feedback);
			that._function = window[that.name];

			Gibberish.defineProperties( that, ["feedback"] );

			// todo: this doesn't seem to be working... the buffer might need to be resampled.
			(function(obj) {
				var _time = obj.time;
			    Object.defineProperty(that, "time", {
					get: function() { return _time; },
					set: function(value) {
						if(_time !== value) {
							_time = value;
							obj.buffer = new Float32Array(value);
							Gibberish.dirty(that);
						}
					},
				});
			})(that);

			return that;
		}