function(ev) {
	this.states.b[ev.which >>> 3] = this.states.b[ev.which >>> 3] & ~(1 << (ev.which & 7)) & 255;
}