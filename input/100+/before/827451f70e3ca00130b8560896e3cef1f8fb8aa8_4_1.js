function() {
	
	var code =  binjs_termReadByte();
	
	// non-standard, catch people with a vi twitch, double ESC == exit
	if (code === 27) return [27, 27];
	
	if (code < 64 || code > 95) { // 2 char sequence
		throw new Error( Term.INVALID_ESC );
	}

	if (code === 91) { // CIS codes  ESC[ 32 to 47 terminated by a single 64 to 126 char
		var ret = [27, 91];
		var i = 0;
		do {
			var b = binjs_termReadByte();
			
			if (i++ === 0 && b === 91 ) { // ESC[[ = function keys, generally ignored
				ret.push(b);
				ret.push(binjs_termReadByte());
				return ret;
			}

			ret.push(b);
		} while (b >= 32 && b < 64);
		
		if (b >= 64 && b <= 126) {
			return ret;
		}
		throw new Error( Term.INVALID_ESC );
	}
	
	else if (code === 93 ||  // OSC codes  ESC]  read to BEL or ST  ESC\
			 code === 80 ||  // DCS device control scrint  read to BEL or ST  ESC\
			 code === 94 ||  // ESC^ PM  termianted by ST  ESC\  (we accept BEL too, should we?)
			 code === 95     // ESC_ APC terminated by ST  ESC\  (we accept BEL too, should we?)
			) { 
			
		var ret = [27, code];
		do {
			var b = binjs_termReadByte();
			ret.push(b);
		} while ( b !== 7 && b !== 27); // BEL or ESC
		if (b === 27) {
			var stt = binjs_termReadByte();
			if (stt !== 92) throw new Error( Term.INVALID_ESC );
			ret.push(stt); 
		}
		return ret;
	}

	else if (code === 78) {  // SS2 code ESCN read one more char
		return [27, code, binjs_termReadByte()];
	}
	
	else if (code === 79) {  // SS3 code ESCO (capital O) read one more char
		return [27, code, binjs_termReadByte()];
	}
	
	else {  // 2 char ESC code
		return [27, code];
	}
	// TODO ESC O ESC _
}