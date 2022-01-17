function() {

	var code =  binjs_termReadByte();
	
	// non-standard, catch people with a vi twitch, double ESC == exit
	if (code === 27) return [27, 27];
	
	if ( code === 155 ) { // Single UTF CSI
		return this._consumeCSI([27, code]);
	}
	
	else if ( code === 194 ) { // Unicdoe CSI 0xC2, 0x9B
		var b = binjs_termReadByte();
		if ( b === 155 ) {
			return this._consumeCSI([27, code, b]);
		}
		else if (this.throwOnError) throw new Error( Term.INVALID_ESC + " " + code + " " + b);
		else return [27, code, b];
	}
	
	else if (code === 91) { // CIS codes  ESC[ 32 to 47 terminated by a single 64 to 126 char
		return this._consumeCSI([27, 91]);
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
			if (stt !== 92) {
				if (this.throwOnError) throw new Error( Term.INVALID_ESC );
				return;
			}
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
	
	else if (code < 64 || code > 95) { // 2 char sequence
		if (this.throwOnError) throw new Error( Term.INVALID_ESC );
		return [27, code];
	}
	
	else {  // 2 char ESC code
		return [27, code];
	}
	// TODO ESC O ESC _
}