function (needle, haystack, modifiers) {
				if (typeof needle === "undefined") throw Error(label.error.invalidArguments);
				switch (true) {
					case typeof modifiers === "undefined":
					case String(modifiers).isEmpty():
						modifiers = "gi";
						break;
					case modifiers === null:
						modifiers = "";
						break;
				}

				var h      = [],
				    n      = typeof needle === "string" ? needle.explode() : needle,
				    result = [],
				    nth,
				    nth2   = n.length,
				    obj    = this.parentNode,
				    keys   = {},
				    regex  = new RegExp(),
				    x, y, f, r, s, p, i, a;

				r = this.records.first();
				switch (true) {
					case typeof haystack === "string":
						h = haystack.explode()
						i = h.length;
						while (i--) { if (!r.data.hasOwnProperty(h[i])) throw Error(label.error.invalidArguments); }
						break;
					default:
						utility.iterate(r.data, function (v, k) { h.push(k); });
				}

				nth = h.length;
				a   = this.total;

				for (i = 0; i < a; i++) {
					for (x = 0; x < nth; x++) {
						for (y = 0; y < nth2; y++) {
							f = h[x];
							p = n[y];
							utility.compile(regex, p, modifiers);
							s = this.records[i].data[f];
							if (!keys[this.records[i].key] && regex.test(s)) {
								keys[this.records[i].key] = i;
								if (result.index(this.records[i]) < 0) result.push(utility.clone(this.records[i]));
							}
						}
					}
				}

				return result;
			}