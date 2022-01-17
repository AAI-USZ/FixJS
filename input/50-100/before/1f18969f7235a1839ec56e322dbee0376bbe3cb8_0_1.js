function len (o){    
	if (Array.isArray(o)) {
		return o.length;
	}
	else if (typeof o == 'string') {
		return Buffer.byteLength(o)
	}
	else {
		var k, l = 0;
		for(k in o) {
			l += Number( obj.hasOwnProperty(k) );
		}
		return l;
	}
}