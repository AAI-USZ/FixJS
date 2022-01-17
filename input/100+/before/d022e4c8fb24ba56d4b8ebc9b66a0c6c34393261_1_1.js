function Segment(tl, start, end, t, i) {
	var cue = (start instanceof WebVTT.Cue)?start:new WebVTT.Cue(i, start, end, t);
	Object.defineProperties(this,{
		id: {
			set: function(id){return cue.id = id;},
			get: function(){return cue.id;},
			enumerable: true
		},
		startTime: {
			set: function(t){return cue.startTime = t/1000;},
			get: function(){return cue.startTime*1000;},
			enumerable: true
		},
		endTime: {
			set: function(t){return cue.endTime = t/1000;},
			get: function(){return cue.endTime*1000;},
			enumerable: true
		},
		text: {
			set: function(t){return cue.text = t;},
			get: function(){return cue.text;},
			enumerable: true
		}
	});
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