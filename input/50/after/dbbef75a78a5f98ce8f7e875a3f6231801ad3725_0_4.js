function(ev) {
	this.states.b[ev.keyCode >>> 3] = this.states.b[ev.keyCode >>> 3] & ~(1 << (ev.keyCode & 7)) & 255;
}