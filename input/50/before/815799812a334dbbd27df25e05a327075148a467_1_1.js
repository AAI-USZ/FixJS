function visibility(v){
		if( v != null && typeof v == typeof "" && ( v == "hidden" || v == "visible" ) ){
			return v;
		} else {
			$.error("SVG renderer does not recognise %o as a valid visibility", v);
		}
	}