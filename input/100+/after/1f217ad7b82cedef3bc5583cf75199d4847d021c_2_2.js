function (data) {
	// Buffer the incoming data
	if (data && data.length > 0) {
		this.buffer.push(data)
		this.length += data.length
	}

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

	var n = this.length
	var size = n >= this.chunkSize ? this.chunkSize : this.ending ? n : 0

	if (size > 0) {
		var buf = new Buffer(this.chunkBound)
		var input = Buffer.concat(this.buffer, this.length)
		var res = this.compress( input.slice(0, size), buf.slice(4) )
		if (res === 0) {
			this.pause()
			this.emit( 'error', new Error('Compression error') )
			return false
		}
		buf.writeUInt32LE(res, 0, false)
		this.emit( 'data', buf.slice(0, res + 4) )

		this.length = input.length - size
		this.buffer =  this.length > 0 ? [ input.slice(size) ] : []
	}
	
	if (this.needDrain) {
		this.needDrain = false
		this.emit('drain')
	}

	return true
}