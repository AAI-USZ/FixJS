function labelValign(a){
		if( a != null && typeof a == typeof "" && ( a == "top" || a == "bottom" || a == "middle" ) ){
			return a;
		} else {
			//$.error("SVG renderer does not recognise %o as a valid label vertical alignment", a);
		}	
	}