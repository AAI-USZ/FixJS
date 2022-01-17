function(time, feedback, damping) {
			var that = {
				type:		"Comb",
				category:	"FX",
				feedback:	feedback || .84,
				time:		time || 1200,
				buffer:		new Float32Array(time || 1200),
				damping:	damping || .2,
				source:		null,
			};
			Gibberish.extend(that, new Gibberish.ugen());

			that.name = Gibberish.generateSymbol(that.type);
			Gibberish.masterInit.push(that.name + " = Gibberish.make[\"Comb\"]();");
			window[that.name] = Gibberish.make["Comb"](that.buffer, that.feedback, that.damping);
			that._function = window[that.name];

			Gibberish.defineProperties( that, ["feedback"] );

			// todo: this doesn't seem to be working... the buffer might need to be resampled.
			// (function(obj) {
			// 	var _time = obj.time;
			//     Object.defineProperty(that, "time", {
			// 		get: function() { return _time; },
			// 		set: function(value) {
			// 			if(_time !== value) {
			// 				_time = value;
			// 				obj.buffer = new Float32Array(value);
			// 				that.dirty = true;
			// 				Gibberish.dirty = true;
			// 			}
			// 		},
			// 	});
			// })(that);

			return that;
		}