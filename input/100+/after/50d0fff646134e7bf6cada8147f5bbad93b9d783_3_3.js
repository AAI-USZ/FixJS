function (callback) {
		ASSERT(typeof callback === "function" && callback.length === 1);

		var missing = 1;
		var fire = function (err) {
			if( missing && (err || --missing === 0) ) {
				missing = 0;
				callback(err);
			}
		};

		return {
			add: function () {
				ASSERT(missing >= 1);
				++missing;
				return fire;
			},

			start: function () {
				ASSERT(missing >= 1);
				fire(null);
			}
		};
	}