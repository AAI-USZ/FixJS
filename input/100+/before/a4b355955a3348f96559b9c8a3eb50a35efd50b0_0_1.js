function (obj, arg) {
			var indices = [],
			    nth, i;

			arg = typeof arg.indexOf === "function" ? arg.explode() : [arg];
			nth = obj.length;
			arg.each(function (idx) { for (i = 0; i < nth; i++) if (idx === obj[i]) indices.push(i); });
			return indices.sort(function(a, b) { return a - b; });
		}