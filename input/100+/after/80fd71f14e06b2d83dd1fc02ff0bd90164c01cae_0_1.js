function sha1Hash(buffer) {
	H0 = 0x67452301;
	H1 = 0xefcdab89;
	H2 = 0x98badcfe;
	H3 = 0x10325476;
	H4 = 0xc3d2e1f0;
	let len_, len = buffer.length,
		blocks = new Uint8Array(Math.ceil((len / 4 + 3) / 16) * 16 * 4);
	for (let i = len - 1; i >= 0; i--) {
		blocks[i] = buffer.charCodeAt(i);
	}
	blocks[len] = 0x80;
	blocks = new Uint32Array(blocks.buffer);
	len_ = blocks.length;
	if(is_little_endian) {
		for(let i = len_, x; i--;) {
			x = blocks[i];
			blocks[i] = (x >>> 24) | ((x<<8) & 0x00FF0000) | ((x >>> 8) & 0x0000FF00) | (x<<24);
		}
	}
	blocks[len_ - 2] = Math.floor(((len) * 8) / Math.pow(2, 32));
	blocks[len_ - 1] = ((len) * 8) & 0xffffffff;
	for(let i = 0; i < len_; i += 16){
		W.set(blocks.subarray(i, i + 16));
		sha_transform();
	}
	return toHexStr(H0) + toHexStr(H1) + toHexStr(H2) + toHexStr(H3) + toHexStr(H4);
}