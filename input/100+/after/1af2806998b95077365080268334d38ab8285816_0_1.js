function Segment(tl, start, end, t, i) {
	var cue = (start instanceof WebVTT.Cue)?start:new WebVTT.Cue(i, start, end, t);
	
	this.tl = tl;
	this.cue = cue;
	this.selected = false;
	this.move = false;
	this.resize = false;
	this.deleted = false;
	this.selectable = true;
	this.track = null;
	this.moveEvent = null;
	this.contentId = -1;
	this.parentId = -1;
	this.resizeSide = 0;

	// For mouse control
	this.mouseDownPos = {x: 0, y:0};
	this.startingPos = 0;
	this.startingLength = 0;
}