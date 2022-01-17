function() {
	var ret = [0 , 0];
	var codes = this.query(27, 91, 54, 110); // ESC[6n
	
	if (codes.length === 0) return [-1 , -1];
	if ( codes[0] !== 27 ) {
		if (this.throwOnError) throw new Error( Term.INVALID_ESC );
		return;
	}
	if ( codes[1] !== 91 ) {
		if (this.throwOnError) throw new Error( Term.INVALID_ESC );
		return;
	}
	
	var num = "";
	for (var i = 2 ; i < codes.length ; i++) {
		if (codes[i] === 82) { //R terminator
			ret[1] = parseInt(num);
			return ret;
		}
		else if (codes[i] === 59) { //; delim
			ret[0] = parseInt(num);
			num = "";
		}
		else if (codes[i] >= 48 && codes[i] <= 57) {
			num += String.fromCharCode(codes[i]);
		}
		else {
			if (this.throwOnError) throw new Error( Term.INVALID_ESC );
			return;
		}
	}
	if (this.throwOnError) throw new Error( Term.INVALID_ESC );
}