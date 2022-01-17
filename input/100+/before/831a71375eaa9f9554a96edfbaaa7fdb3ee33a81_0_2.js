function(str) {
		if( typeof( str ) != "string" ) { return str; }
		str=str.strip();
		if (str.substring(0,2)=="午前") {
		    str = str.substring(2,str.length);
		}
		else if (str.substring(0,2)=="午後") {
		    str = String(12+parseInt(str.substring(2,str.length)));
		}
		return str;
	    }