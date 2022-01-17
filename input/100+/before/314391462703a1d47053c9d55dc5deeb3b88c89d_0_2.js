function (e) {
		
		// when ctrl is down browsers return a capital letter
		// most browsers doesn't return e.ctrlKey being true
		// on keypress...
		var keycode = e.keyCode || e.charCode;
		var character= String.fromCharCode(keycode);
		if ( ctrlKey ) {
			character = character.toUpperCase();
		}
		// 13 is enter
		if ( keycode == obj.evalKey ){ 
			obj.evalQuery();
			e.preventDefault();
		}
		// 27 is escape
		else if ( keycode == 27 ) 
			obj.close();
		else if ( keycode == 9 ) {
			e.preventDefault();
			obj.complete();
		}
		else if ( character == "P" && ctrlKey){
			obj.prevHistEntry();
			e.preventDefault();
		}
		else if ( character == "N" && ctrlKey ){
			obj.nextHistEntry();
			e.preventDefault();
		}
		else if ( character == "L" && ctrlKey ){
			obj.clear();
			e.preventDefault();
		}


		if ( keycode != 9 ){
			lastMatches = null;
			lastIndex = 0;
		}

		ctrlKey = false;
	}