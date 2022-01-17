function number(n){
		if( n != null && typeof n == typeof 1 && !isNaN(n) ){
			return n;
		} else {
			//$.error("SVG renderer does not recognise %o as a valid number", n);
		}
	}