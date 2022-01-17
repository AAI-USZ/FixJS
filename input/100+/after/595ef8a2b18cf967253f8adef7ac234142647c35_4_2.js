function () {
			var i = 0, fn, fn2, r, j = 0, z;
			fn = t.call(function () { ++i; return arguments; },
				 { length: 3, resolvers: [Boolean, String] });
			return {
				"No args": function () {
					i = 0;
					a.deep(toArray(r = fn()), [false, 'undefined'], "First");
					a(fn(), r, "Second");
					a(fn(), r, "Third");
					a(i, 1, "Called once");
				},
				"Some Args": function () {
					var x = {};
					i = 0;
					a.deep(toArray(r = fn(0, 34, x, 45)), [false, '34', x, 45],
						"First");
					a(fn(0, 34, x, 22), r, "Second");
					a(fn(0, 34, x, false), r, "Third");
					a(i, 1, "Called once");
					return {
						"Other": function () {
							a.deep(toArray(r = fn(1, 34, x, 34)),
								[true, '34', x, 34], "Second");
							a(fn(1, 34, x, 89), r, "Third");
							a(i, 2, "Called once");
						}
					};
				}
			};
		}