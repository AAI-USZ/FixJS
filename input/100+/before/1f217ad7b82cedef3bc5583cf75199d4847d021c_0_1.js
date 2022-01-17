function LZ4_uncompress (input, chunkSize, outputSize) {
		chunkSize = chunkSize || DEFAULT_CHUNKSIZE

		// Magic number check
		if (input.length < 4
		|| input.readUInt32LE(0, true) !== lz4.ARCHIVE_MAGICNUMBER )
			decodeError(0)

		// Output size is known, allocate all of it in one call
		if (outputSize) {
			var output = new Buffer(outputSize)

			// Current index in the output buffer
			var pos = 0

			for (var i = 4, n = input.length; i < n;) {
				var size = input.readUInt32LE(i, true)
				i += 4
				var decodedSize = LZ4_uncompressChunk( input.slice(i, i + size), output.slice(pos, pos + chunkSize) )
				if (decodedSize < 0) decodeError(-decodedSize)
				i += size
				pos += decodedSize
			}

			return output
		}

		// Unknown output size, allocate on each pass
		var output = []
		for (var i = 4, n = input.length; i < n;) {
			var size = input.readUInt32LE(i, true)
			i += 4
			var buf = new Buffer(chunkSize)
			var decodedSize = LZ4_uncompressChunk( input.slice(i, i + size), buf )
			if (decodedSize < 0) decodeError(-decodedSize)
			output.push( decodedSize < chunkSize ? buf.slice(0, decodedSize) : buf )
			i += size
		}

		return Buffer.concat(output)
	}