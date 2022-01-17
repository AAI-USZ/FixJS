function join( pre, arr, post ) {
		var s = jsDump.separator(),
			base = jsDump.indent(),
			inner = jsDump.indent(1);
		if ( arr.join ) {
			arr = arr.join( ',' + s + inner );
		}
		if ( !arr ) {
			return pre + post;
		}
		return [ pre, inner + arr, base + post ].join(s);
	}