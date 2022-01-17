function () {
			Tools.loop(array, function (val, key) {
				if (key == 0) {
					array.splice(key, 1);
				}
				expect(typeof val != "undefined" && key != 3).toEqual(true);
			});
		}