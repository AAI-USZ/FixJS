function ConcatBuffer(a, b) {
	var t = new Buffer(a.length + b.length)
	a.copy(t, 0, 0)
	b.copy(t, a.length, 0)
	return t
}