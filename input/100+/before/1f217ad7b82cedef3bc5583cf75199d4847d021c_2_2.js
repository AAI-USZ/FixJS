function (data) {
	// Buffer the incoming data
	if (data)
		this.buffer = Buffer.concat(
			[ this.buffer, data ]
		, this.buffer.length + data.length
		)

	if (this.paused) {
		this.needDrain = true
		return false
	}

	if (this.first) {
		var buf = new Buffer(4)
		buf.writeUInt32LE(ARCHIVE_MAGICNUMBER, 0, false)
		this.emit( 'data', buf )
		this.first = false
	}

	var n = this.buffer.length
	var size = n >= this.chunkSize ? this.chunkSize : this.ending ? n : 0

	if (size > 0) {
		var buf = new Buffer(this.chunkBound)
		// var res = LZ4_compressChunk( this.buffer.slice(0, size), buf.slice(4) )
		var res = this.chunkBound - 4
		if (res === 0) {
			this.pause()
			this.emit( 'error', new Error('Compression error') )
			return false
		}
		buf.writeUInt32LE(res, 0, false)
		this.emit( 'data', buf.slice(0, res + 4) )

		this.buffer = this.buffer.slice(size)
	}
	
	if (this.needDrain) {
		this.needDrain = false
		this.emit('drain')
	}

	return true
}