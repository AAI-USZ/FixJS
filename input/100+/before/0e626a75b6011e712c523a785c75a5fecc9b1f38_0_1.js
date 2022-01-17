function item(selector,startTime,endTime,animations){
	this.selector = selector;
	this.container = this.selector.parents().eq(0);
	this.originalHeight = parseInt(selector.css('height').replace('px',''));
	this.originalWidth  = parseInt(selector.css('width').replace('px',''));
	this.currentBottom  = parseInt(selector.css('bottom').replace('px',''));
	this.adjustedHeight = this.originalHeight * windowScale;
	this.adjustedWidth  = this.originalWidth * windowScale;
	this.startTime      = startTime;
	this.endTime				= endTime;
	this.animations     = animations;
	this.count					= 0;
	this.selector.css({'height':this.adjustedHeight,'width':this.adjustedWidth});
}