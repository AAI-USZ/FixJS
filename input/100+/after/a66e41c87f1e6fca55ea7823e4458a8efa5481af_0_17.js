function( o, n ) {
		o = o.replace( /\s+$/, "" );
		n = n.replace( /\s+$/, "" );

		var i, pre,
			str = "",
			out = diff( o === "" ? [] : o.split(/\s+/), n === "" ? [] : n.split(/\s+/) ),
			oSpace = o.match(/\s+/g),
			nSpace = n.match(/\s+/g);

		if ( oSpace == null ) {
			oSpace = [ " " ];
		}
		else {
			oSpace.push( " " );
		}

		if ( nSpace == null ) {
			nSpace = [ " " ];
		}
		else {
			nSpace.push( " " );
		}

		if ( out.n.length === 0 ) {
			for ( i = 0; i < out.o.length; i++ ) {
				str += "<del>" + out.o[i] + oSpace[i] + "</del>";
			}
		}
		else {
			if ( out.n[0].text == null ) {
				for ( n = 0; n < out.o.length && out.o[n].text == null; n++ ) {
					str += "<del>" + out.o[n] + oSpace[n] + "</del>";
				}
			}

			for ( i = 0; i < out.n.length; i++ ) {
				if (out.n[i].text == null) {
					str += "<ins>" + out.n[i] + nSpace[i] + "</ins>";
				}
				else {
					// `pre` initialized at top of scope
					pre = "";

					for ( n = out.n[i].row + 1; n < out.o.length && out.o[n].text == null; n++ ) {
						pre += "<del>" + out.o[n] + oSpace[n] + "</del>";
					}
					str += " " + out.n[i].text + nSpace[i] + pre;
				}
			}
		}

		return str;
	}