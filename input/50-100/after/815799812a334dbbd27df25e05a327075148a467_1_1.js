function percent(p){
		if( p != null && typeof p == typeof 1 && !isNaN(p) &&  0 <= p && p <= 1 ){
			return p;
		} else {
			//$.error("SVG renderer does not recognise %o as a valid percent (should be between 0 and 1)", p);
		}
	}