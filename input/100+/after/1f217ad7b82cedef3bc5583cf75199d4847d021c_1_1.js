function LZ4_compress (input, chunkSize, hc) {
	if (typeof chunkSize === 'boolean') {
		hc = chunkSize
		chunkSize = 0
	}
	chunkSize = chunkSize || DEFAULT_CHUNKSIZE

	var compress = hc ? LZ4_compressHCChunk : LZ4_compressChunk
	var chunkBound = LZ4_compressBound(chunkSize) + 4
	var output = [ ARCHIVE_MAGICNUMBER_BUFFER ]

	var i = 0
	var n = input.length
	while (i < n) {
		var buf = new Buffer(chunkBound)
		var size = chunkSize > n - i ? n - i : chunkSize
		var res = compress( input.slice(i, i + size), buf.slice(4) )
		if (res === 0) {
			throw new Error('Compression error')
		}
		buf.writeUInt32LE(res, 0, false)
		output.push( buf.slice(0, res + 4) )
		i += size
	}

	return Buffer.concat(output)
}