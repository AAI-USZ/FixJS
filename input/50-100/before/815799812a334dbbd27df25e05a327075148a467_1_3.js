function labelHalign(a){
		if( a != null && typeof a == typeof "" && ( a == "left" || a == "right" || a == "middle" ) ){
			return a;
		} else {
			$.error("SVG renderer does not recognise %o as a valid label horizonal alignment", a);
		}	
	}