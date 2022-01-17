function color(c){
		if( c != null && typeof c == typeof "" && $.Color(c) != "" ){
			return $.Color(c).toHEX();
		} else {
			//$.error("SVG renderer does not recognise %o as a valid colour", c);
		}
	}