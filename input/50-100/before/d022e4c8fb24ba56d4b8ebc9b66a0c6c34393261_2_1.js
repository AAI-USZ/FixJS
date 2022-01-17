function SegmentPlaceholder(tl, x, track) {
	this.tl = tl;
	this.startX = x;
	this.endX = 0;
	this.track = track;
	this.renderIndex = tl.misc.length;
	tl.misc.push(this);
}