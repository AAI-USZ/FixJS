function Encoder (options) {
	if ( !(this instanceof Encoder) )
		return new Encoder(options)
	
	// Options
	options = options || {}
	this.chunkSize = options.chunkSize || (8 << 20) // 8Mb by default

	// Stream states
	this.readable = true
	this.writable = true
	this.ended = false
	this.paused = false
	this.needDrain = false

	// Data being processed
	this.buffer = new Buffer(0)

	this.first = true
	this.chunkBound = LZ4_compressBound(this.chunkSize) + 4
	this.ending = false
}