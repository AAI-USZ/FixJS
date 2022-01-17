function (callback) {
		ASSERT(typeof callback === "function" && callback.length === 2);

		var missing = 1;
		var array = [];

		var fire = function (index, err, data) {
			if( missing ) {
				array[index] = data;
				if( err || --missing === 0 ) {
					missing = 0;
					callback(err, array);
				}
			}
		};

		return {
			add: function () {
				ASSERT(missing >= 1);

				++missing;
				return fire.bind(null, array.length++);
			},

			start: function () {
				ASSERT(missing >= 1);

				if( --missing === 0 ) {
					callback(null, array);
				}
			}
		};
	}