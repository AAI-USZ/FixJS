function(S){
	function sha_init(data) {
		var bin = [], i = 0, len;
		// input into 32 bit words
		if (typeof(data) == "string") {
			// encode_utf8
			data = unescape( encodeURIComponent( data ) )
			for (len = data.length;i < len;bin[i >> 2] = data.charCodeAt(i++)<<24|data.charCodeAt(i++)<<16|data.charCodeAt(i++)<<8|data.charCodeAt(i++));
		} else {
			for (len = data.length;i < len;bin[i >> 2] = data[i++]<<24|data[i++]<<16|data[i++]<<8|data[i++]);
		}

		// append a 1 bit
		i = len << 3;
		bin[len >> 2] |= 0x80 << (24 - (i & 31));

		// append 0 bits to length  bits % 512 == 448
		bin.push.apply(bin, [0,0,0,0,0,0,0,0,0,0,0,0,0,0].slice( bin.length & 15 ));

		// append 64-bit source length
		bin.push(0, i);
		
		return bin;
	}

	function sha_format(asBytes, arr){
		var out = [],i=0, len=arr.length;
		if (asBytes) {
			// convert to byte array
			for (;i<len;i++) out.push( (arr[i]>>>24)&0xff, (arr[i]>>>16)&0xff, (arr[i]>>>8)&0xff, arr[i]&0xff );
			return out;
		}
		//for (;i<len;i++) out[i] = ("0000000" + (arr[i]>>>0).toString(16)).slice(-8)
		for (;i<len;i++) {
			var s = (arr[i]>>>0).toString(16);
			out[i] = (s.length===8) ? s : ("0000000"+s).slice(-8);
		}

		return out.join("");
	}

	function sha1(data, asBytes) {
		var h0 = 0x67452301
		  , h1 = 0xefcdab89
		  , h2 = 0x98badcfe
		  , h3 = 0x10325476
		  , h4 = 0xc3d2e1f0
		  , bin = sha_init(data)
		  , i = 0, j, len = bin.length, a, b, c, d, e, t, w = []

		while (i < len) {
			w = bin.slice(i, i+=(j=16))
			while (j < 80) {
				t = w[j-3]^w[j-8]^w[j-14]^w[j-16]
				w[j++] = (t<<1)|(t>>>31)
			}
			a = h0
			b = h1
			c = h2
			d = h3
			e = h4
			j = 0
			while (j<80) {
				if (j<20) t=((b&c)|(~b&d))+0x5A827999
				else if (j<40) t=(b^c^d)+0x6ED9EBA1
				else if (j<60) t=((b&c)|(b&d)|(c&d))+0x8F1BBCDC
				else t=(b^c^d)+0xCA62C1D6
				t += ((a<<5)|(a>>>27))+e+w[j++]
				e = d
				d = c
				c = (b<<30)|(b>>>2)
				b = a
				a = t>>>0
			}
			h0 = (a + h0)>>>0
			h1 = (b + h1)>>>0
			h2 = (c + h2)>>>0
			h3 = (d + h3)>>>0
			h4 = (e + h4)>>>0
		}
		return sha_format(asBytes, [h0, h1, h2, h3, h4]);
	}



	var s_sha1 = function(asBytes){
		return S.sha1 === s_sha1 && sha1(""+this, asBytes);
	}

	S.sha1 = s_sha1;

	function sha256(data, asBytes) {
		var h0 = 0x6a09e667
		  , h1 = 0xbb67ae85
		  , h2 = 0x3c6ef372
		  , h3 = 0xa54ff53a
		  , h4 = 0x510e527f
		  , h5 = 0x9b05688c
		  , h6 = 0x1f83d9ab
		  , h7 = 0x5be0cd19
		  , bin = sha_init(data)
		  , i = 0, j, len = bin.length, a, b, c, d, e, f, g, h, t1, t2, w = []
		  , map = [ 
				  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5
				, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174
				, 0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da
				, 0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967
				, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85
				, 0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070
				, 0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3
				, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
			]

		while (i < len) {
			w = bin.slice(i, i+=(j=16))
			while (j < 64) {
				t1 = w[j-2]
				t2 = w[j-15]
				t1 = (((t1>>>17)|(t1<<15))^((t1>>>19)|(t1<<13))^(t1>>>10)) + w[j-7] + (((t2>>>7)|(t2<<25))^((t2>>>18)|(t2<<14))^(t2>>>3)) + w[j-16]
				w[j++] = t1
			}
			a = h0
			b = h1
			c = h2
			d = h3
			e = h4
			f = h5
			g = h6
			h = h7
			j = 0
			while (j < 64) {
				t1 = h + (((e>>>6)|(e<<26))^((e>>>11)|(e<<21))^((e>>>25)|(e<<7))) + ((e&f)^((~e)&g)) + map[j] + w[j++]
				t2 = (((a>>>2)|(a<<30))^((a>>>13)|(a<<19))^((a>>>22)|(a<<10))) + ((a&b)^(a&c)^(b&c))
				h = g
				g = f
				f = e
				e = (d + t1)>>>0
				d = c
				c = b
				b = a
				a = (t1 + t2)>>>0
			}
			h0 = (a + h0)>>>0
			h1 = (b + h1)>>>0
			h2 = (c + h2)>>>0
			h3 = (d + h3)>>>0
			h4 = (e + h4)>>>0
			h5 = (f + h5)>>>0
			h6 = (g + h6)>>>0
			h7 = (h + h7)>>>0
		}
		return sha_format(asBytes, [h0, h1, h2, h3, h4, h5, h6, h7]);
	}

	var s_sha256 = function(asBytes){
		return s_sha256 === S.sha256 && sha256(""+this, asBytes);
	}
	
	S.sha256 = s_sha256;

	//** HMAC 
	function hmac(hasher, blocksize, key, txt) {
		var i=0, j, ipad = [], opad = [];
		if (key.length > blocksize) {
			for(key=hasher(key,true); i<blocksize; ipad[i]=key[i]^0x36,opad[i]=key[i++]^0x5c);
		} else {
			for(; j=key.charCodeAt(i); ipad[i]=j^0x36,opad[i++]=j^0x5c);
		}
		for(; i<blocksize; ipad[i]=0x36,opad[i++]=0x5c);
		for(i=0,j=txt.length; i<j; ipad.push(txt.charCodeAt(i++)) );
		return hasher(opad.concat(hasher(ipad,true)));
	}

	var s_hmac_sha1 = function(key){
				return S.hmac_sha1 === s_hmac_sha1 && hmac(sha1, 64, key, this);
			}
	  , s_hmac_sha256 = function(key){
	  		return S.hmac_sha256 === s_hmac_sha256 && hmac(sha256, 64, key, this);
	  	}
	
	S.hmac_sha1 = s_hmac_sha1;
	S.hmac_sha256 = s_hmac_sha256;
	//*/

}