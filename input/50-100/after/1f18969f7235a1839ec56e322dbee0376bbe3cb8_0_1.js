function ReduceBuffer(a, b) {
	return ConcatBuffer(a, Buffer.isBuffer(b) ? b : new Buffer(b));
}