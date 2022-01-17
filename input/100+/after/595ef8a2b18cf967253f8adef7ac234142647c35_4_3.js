function () {
				var i = 0, fn, mfn, r, x = {};

				fn = function (a, b, c) {
					if (c === 3) {
						++i;
					}
					return arguments;
				}

				mfn = t.call(fn);
				mfn(1, x, 3);
				mfn(1, x, 4);
				mfn.clearCache(1, x, 4);
				mfn(1, x, 3);
				mfn(1, x, 3);
				a(i, 1, "Pre clear");
				mfn.clearCache(1, x, 3);
				mfn(1, x, 3);
				a(i, 2, "After clear");

				i = 0;
				mfn = t.call(fn, { length: false });
				mfn(1, x, 3);
				mfn(1, x, 3);
				mfn();
				mfn();
				mfn.clearCache();
				mfn(1, x, 3);
				a(i, 1, "Proper no arguments clear");
			}