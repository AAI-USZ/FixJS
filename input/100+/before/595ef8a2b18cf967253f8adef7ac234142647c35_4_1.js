function () {
			var i = 0, fn = function () { ++i; return arguments; }, r;

			fn = t.call(fn, false);
			return {
				"No args": function () {
					i = 0;
					a.deep(toArray(r = fn()), [], "First");
					a(fn(), r, "Second");
					a(fn(), r, "Third");
					a(i, 1, "Called once");
				},
				"Some Args": function () {
					var x = {};
					i = 0;
					a.deep(toArray(r = fn(x, 8)), [x, 8], "First");
					a(fn(x, 8), r, "Second");
					a(fn(x, 8), r, "Third");
					a(i, 1, "Called once");
				},
				"Many args": function () {
					var x = {};
					i = 0;
					a.deep(toArray(r = fn(x, 8, 23, 98)), [x, 8, 23, 98], "First");
					a(fn(x, 8, 23, 98), r, "Second");
					a(fn(x, 8, 23, 98), r, "Third");
					a(i, 1, "Called once");
				}
			};
		}