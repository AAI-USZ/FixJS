function (callback) {
			ASSERT(callback);

			var counter = 1;
			var error = null;

			this.start = function () {
				ASSERT(callback && counter >= 1);

				++counter;
			};

			this.done = function (err) {
				ASSERT(callback && counter >= 1);

				error = error || err;

				if( --counter === 0 ) {
					callback(error);
					callback = null;
				}
			};
		}