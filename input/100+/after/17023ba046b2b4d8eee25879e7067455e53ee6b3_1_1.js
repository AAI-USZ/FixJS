function(s) {
		var a = []
			, t = s.split("->");
		
		if (t.length > 1) while (t.length) {
			s = t.pop();
			a = t.pop().trim().split(/[\s,]+/);
			t.length && t.push("(function("+a+"){return ("+s+")})");
		} else {
			// test whether an operator appears on the left (or right), respectively
			if (t = s.match(/^\s*(?:[+*\/%&|\^\.=<>]|!=)/)) {
				a.push("$1");
				s = "$1" + s;
			}
			// test whether an operator appears on the right
			if (s.match(/[+\-*\/%&|\^\.=<>!]\s*$/)) {
				a.push("$2");
				s += "$2";
			} else if (!t) {
				// `replace` removes symbols that follow '.',
				// precede ':', are 'this' or 'arguments'; and also the insides of
				// strings (by a crude test).  `match` extracts the remaining
				// symbols.
				a = a.concat( s.replace(/'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|this|arguments|\.\w+|\w+:/g, "").match(/\b[a-z_]\w*/g) ).unique();
			}
		}
		return new Function(a, "return(" + s + ")");
	}